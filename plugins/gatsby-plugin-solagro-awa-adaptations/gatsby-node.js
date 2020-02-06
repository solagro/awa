const path = require('path');
const slugify = require('slugify');
const csvtojson = require('csvtojson');

const { siteMetadata: { locales = [] } = {} } = require('../../gatsby-config.js');

const REPORTER_PREFIX = '[solagro-awa-adaptations] ';

const cleanValue = str => slugify(str).toLowerCase();

const getValueFrom = catalog => (sectionName = '', id = '') => {
  const section = catalog[sectionName] || [];
  const item = section.find(({ id: itemId }) => (itemId === id)) || {};
  return item.name || id;
};

exports.onCreateNode = async ({
  node,
  loadNodeContent,
  createContentDigest,
  actions: { createNode, createParentChildLink, createNodeField },
}) => {
  /**
   * Create nodes for each adaptation measure
   */
  if (node.sourceInstanceName === 'adaptations' && node.extension === 'csv') {
    const csv = await loadNodeContent(node);
    const allLines = await csvtojson({ delimiter: ',' }).fromString(csv);

    const cleanLines = allLines
      // remove lines with no index
      .filter(({ index }) => Boolean(index))
      // generate slug for farming system, vulnerability component and measure name
      .map(measure => ({
        ...measure,
        'farming-system': cleanValue(measure['farming-system']),
        'farm-vulnerability-component': cleanValue(measure['farm-vulnerability-component']),
        slug: cleanValue(measure['name-of-the-measure']),
      }));

    await Promise.all(cleanLines.map(async (measure, index) => {
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

exports.createPages = async ({ reporter, graphql, actions: { createPage } }) => {
  /**
   * Get catalog data from GraphQL storage
   */
  const { data: {
    catalogContainer: { catalog: [catalog] },
    measuresContainer: { measures },
  } } = await graphql(`
    query MyQuery {
      catalogContainer: allAdaptationsJson {
        catalog: nodes {
          weather_event { name id }
          climate_risk_region { name id }
        }
      }

      measuresContainer: allAdaptationMeasures {
        measures: nodes {
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
    }
  `);

  /**
   * Replace some field ids by corresponding value from catalog
   */
  const getCatalogValue = getValueFrom(catalog);
  const cleanMeasures = measures.map(({ fields: { measure } }) => ({
    ...measure,
    climate_risk_region: getCatalogValue('climate_risk_region', measure.climate_risk_region),
    weather_event: getCatalogValue('weather_event', measure.weather_event),
  }));

  const createdPathes = new Set();

  // en/adaptations/system/vulnerability/zone/action
  await Promise.all(cleanMeasures.map(async ({
    farming_system: system,
    farm_vulnerability_component: vulnerability,
    climate_risk_region: region,
    slug,
  }) => Promise.all(locales.map(async language => {
    const pathElements = [language, 'adaptations', system, vulnerability, region, slug];

    const pathSystem = path.join(...pathElements.slice(0, 3));
    const pathVulnerability = path.join(...pathElements.slice(0, 4));
    const pathRegion = path.join(...pathElements.slice(0, 5));
    const pathFull = path.join(...pathElements);

    if (!createdPathes.has(pathSystem)) {
      createdPathes.add(pathSystem);
      await createPage({
        path: pathSystem,
        component: path.resolve('./src/components/Debug.js'),
        context: { language, system },
      });
    }

    if (!createdPathes.has(pathVulnerability)) {
      createdPathes.add(pathVulnerability);
      await createPage({
        path: pathVulnerability,
        component: path.resolve('./src/components/Debug.js'),
        context: { language, system, vulnerability },
      });
    }

    if (!createdPathes.has(pathRegion)) {
      createdPathes.add(pathRegion);
      await createPage({
        path: pathRegion,
        component: path.resolve('./src/components/Debug.js'),
        context: { language, system, vulnerability, region },
      });
    }

    createdPathes.add(pathFull);
    await createPage({
      path: pathFull,
      component: path.resolve('./src/components/Debug.js'),
      context: { language, system, vulnerability, region, slug },
    });
  }))));

  reporter.info(`${REPORTER_PREFIX}${createdPathes.size} adaptation pages created.`);
};
