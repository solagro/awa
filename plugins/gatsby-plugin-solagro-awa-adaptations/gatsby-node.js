
const fs = require('fs').promises;
const path = require('path');

const slugify = require('slugify');
const csvtojson = require('csvtojson');

const { siteMetadata: { locales = [] } = {} } = require('../../gatsby-config.js');

const REPORTER_PREFIX = '[solagro-awa-quiz-map-adaptations] ';

const cleanValue = str => slugify(str).toLowerCase();

const getValueFrom = catalog => (sectionName = '', id = '') => {
  const section = catalog[sectionName] || [];
  const item = section.find(({ id: itemId }) => (itemId === id)) || {};
  return item.name || id;
};

exports.createPages = async ({ reporter, graphql, actions: { createPage } }) => {
  const csv = await fs.readFile('content/adaptations/adaptations.csv');
  const allLines = await csvtojson({ delimiter: ',' }).fromString(csv.toString());

  /**
   * Get catalog data from GraphQL storage
   */
  const { data: { catalogContainer: { catalog: [catalog] } } } = await graphql(`
    query MyQuery {
      catalogContainer: allAdaptationsJson {
        catalog: nodes {
          weather_event { name id }
          climate_risk_region { name id }
        }
      }
    }
  `);

  const getCatalogValue = getValueFrom(catalog);

  const cleanLines = allLines
    // remove lines with no index
    .filter(({ index }) => Boolean(index))
    // Populate data table with relational data
    .map(actionProperties => ({
      ...actionProperties,
      'climate-risk-region': getCatalogValue('climate_risk_region', actionProperties['climate-risk-region']),
      'weather-event': getCatalogValue('weather_event', actionProperties['weather-event']),
      'farming-system': cleanValue(actionProperties['farming-system']),
      'farm-vulnerability-component': cleanValue(actionProperties['farm-vulnerability-component']),
      slug: cleanValue(actionProperties['name-of-the-measure']),
    }));

  const createPages = new Set();

  // en/adaptations/system/vulnerability/zone/action
  await Promise.all(cleanLines.map(async ({
    'farming-system': system,
    'farm-vulnerability-component': vulnerability,
    'climate-risk-region': region,
    slug,
  }) => Promise.all(locales.map(async language => {
    const pathElements = [language, 'adaptations', system, vulnerability, region, slug];

    const pathSystem = path.join(...pathElements.slice(0, 3));
    const pathVulnerability = path.join(...pathElements.slice(0, 4));
    const pathRegion = path.join(...pathElements.slice(0, 5));
    const pathFull = path.join(...pathElements);

    if (!createPages.has(pathSystem)) {
      createPages.add(pathSystem);
      await createPage({
        path: pathSystem,
        component: path.resolve('./src/components/Debug.js'),
        context: { language, system },
      });
    }

    if (!createPages.has(pathVulnerability)) {
      createPages.add(pathVulnerability);
      await createPage({
        path: pathVulnerability,
        component: path.resolve('./src/components/Debug.js'),
        context: { language, system, vulnerability },
      });
    }

    if (!createPages.has(pathRegion)) {
      createPages.add(pathRegion);
      await createPage({
        path: pathRegion,
        component: path.resolve('./src/components/Debug.js'),
        context: { language, system, vulnerability, region },
      });
    }

    createPages.add(pathFull);
    await createPage({
      path: pathFull,
      component: path.resolve('./src/components/Debug.js'),
      context: { language, system, vulnerability, region, slug },
    });
  }))));

  reporter.info(`${REPORTER_PREFIX}${createPages.size} adaptation pages created.`);
};