const path = require('path');
const slugify = require('slugify');
const csvtojson = require('csvtojson');

const { siteMetadata: { locales = [] } = {} } = require('../../gatsby-config.js');

const REPORTER_PREFIX = '[solagro-awa-adaptations] ';

const buildPath = (...elements) => ['', ...elements].join('/');
const cleanValue = str => slugify(str).toLowerCase();

const getValueFrom = catalog => (sectionName = '', id = '') => {
  const section = catalog[sectionName] || [];
  const item = section.find(({ id: itemId }) => (itemId === id)) || {};
  return item.value || id;
};

exports.onCreateNode = async ({
  node,
  loadNodeContent,
  createContentDigest,
  getNodesByType,
  actions: { createNode, createParentChildLink, createNodeField },
}) => {
  /**
   * Create nodes for each adaptation measure
   */
  if (node.sourceInstanceName === 'adaptations' && node.extension === 'csv') {
    const csv = await loadNodeContent(node);
    const allLines = await csvtojson({ delimiter: ',' }).fromString(csv);

    const [catalogFromBase] = getNodesByType('AdaptationsJson');
    /**
     * Workaround to avoid intermittent bug when AdaptationsJson nodes do not exist
     */
    const catalog = catalogFromBase
      || require('../../content/adaptations/catalog.json'); // eslint-disable-line global-require

    /**
     * Manipulate array created from CSV to remove meaningless lines
     * and replace some values by proper one
     */
    const getCatalogValue = getValueFrom(catalog);
    const measures = allLines
      // remove lines with no index
      .filter(({ index }) => Boolean(index))
      .map(measure => ({
        ...measure,

        // generate slug for measure name
        slug: cleanValue(measure.name),

        // Replace some field ids by corresponding value from catalog
        'climate-risk-region': getCatalogValue('climate-risk-region', measure['climate-risk-region']),
        'farming-system': getCatalogValue('farming-system', measure['farming-system']),
        'farm-vulnerability-component': getCatalogValue('farm-vulnerability-component', measure['farm-vulnerability-component']),
        'weather-event': getCatalogValue('weather-event', measure['weather-event']),
        '2nd-weather-event': getCatalogValue('weather-event', measure['2nd-weather-event']),
        implementation: getCatalogValue('implementation', measure.implementation),
        'alt-language': getCatalogValue('alt-language', measure['alt-language']),
      }));

    /**
     * Actually create measure nodes
     */
    await Promise.all(measures.map(async (measure, index) => {
      const newNode = {
        id: `adaptation-measures-${node.name}-${index}`,
        parent: node.id,
        internal: {
          contentDigest: createContentDigest(measure),
          type: 'adaptationMeasures',
        },
      };

      // Create node for current measure (adaptation measure)
      await createNode(newNode);

      // Add custom field to new node
      await Promise.all([
        { name: 'slug', value: measure.slug },
        { name: 'json', value: JSON.stringify(measure) },
        { name: 'measure', value: measure },
      ].map(({ name, value }) => createNodeField({ node: newNode, name, value })));

      // Link current measure node to csv file node
      await createParentChildLink({ parent: node, child: newNode });
    }));
  }
};

exports.createPages = async ({ graphql, actions: { createPage, createRedirect }, reporter }) => {
  /**
   * Get all adaptation measures
   * Get all farming systems
   */
  const { data: {
    measuresContainer: { measures },
    allFarmingSystemsContainer: { allFarmingSystems = [] },
  } } = await graphql(`
    query {
      # Get all adaptation measures
      measuresContainer: allAdaptationMeasures {
        measures: nodes {
          id
          fields {
            measure {
              farming_system
              farm_vulnerability_component
              climate_risk_region
              slug
              weather_event
            }
          }
        }
      }

      # Get all farming systems
      allFarmingSystemsContainer: allAdaptationMeasures {
        allFarmingSystems: group(field: fields___measure___farming_system) {
          fieldValue
        }
      }
    }
  `);
  // Simplify farming systems array
  const farmingSystems = allFarmingSystems.map(({ fieldValue }) => fieldValue);

  reporter.info(`${REPORTER_PREFIX}${measures.length} measures found.`);

  /**
   * Get all vulnerability components grouped by farming system
   */
  const { data: queryResult } = await graphql(`
    query {
      ${farmingSystems.map((farmingSystem, index) => (`
        system${index}: allAdaptationMeasures(
          filter: {fields: {measure: {farming_system: {eq: "${farmingSystem}"}}}}
        ) {
          group(field: fields___measure___farm_vulnerability_component) {
            fieldValue
          }
        }
      `))}
    }
  `);

  /**
   * Revamp queryResult as tree
   */
  const tree = Object.values(queryResult).map(({ group }, index) => ({
    system: farmingSystems[index],
    vulnerabilities: group.map(({ fieldValue }) => fieldValue),
  }));

  // eslint-disable-next-line global-require
  const catalog = require('../../content/adaptations/catalog.json');

  const firstSystem = getValueFrom(catalog)('farming-system', '1');

  const firstVulnerabilities = {
    cereals: getValueFrom(catalog)('farm-vulnerability-component', '11'),
    animals: getValueFrom(catalog)('farm-vulnerability-component', '21'),
    'fruits-and-vineyards': getValueFrom(catalog)('farm-vulnerability-component', '31'),
  };

  await Promise.all(locales.map(async language => {
    /**
     * Create redirection from adaptations root path
     * to to first available farming system
     */
    await createRedirect({
      fromPath: buildPath(language, 'adaptations'),
      toPath: buildPath(language, 'adaptations', firstSystem, firstVulnerabilities[firstSystem]),
      redirectInBrowser: true,
      // isPermanent: true,
    });

    await Promise.all(tree.map(async ({ system, vulnerabilities }) => {
      /**
       * Create redirection from farming system root path
       * to first available vulnerability component
       */
      await createRedirect({
        fromPath: buildPath(language, 'adaptations', system),
        toPath: buildPath(language, 'adaptations', system, firstVulnerabilities[system]),
        redirectInBrowser: true,
        // isPermanent: true,
      });

      /**
       * Create page for each adaptation measure
       */
      await Promise.all([...vulnerabilities, 'others'].map(async vulnerability =>
        createPage({
          path: buildPath(language, 'adaptations', system, vulnerability),
          component: path.resolve('./src/components/AdaptationMeasures.js'),
          context: { language, system, vulnerability },
        })));
    }));

    /**
     * Create page for each adaptation measure
     */
    await Promise.all(measures.map(async ({ id, fields: {
      measure: {
        farming_system: system,
        farm_vulnerability_component: vulnerability,
        climate_risk_region: region,
        slug,
      },
    } }) =>
      createPage({
        path: buildPath(language, 'adaptations', system, vulnerability, region, slug),
        component: path.resolve('./src/components/AdaptationMeasure.js'),
        context: { language, id },
      })));
  }));

  const total = measures.length * locales.length;
  reporter.info(`${REPORTER_PREFIX}${total} measure pages created. (${locales.length}×${measures.length})`);
};
