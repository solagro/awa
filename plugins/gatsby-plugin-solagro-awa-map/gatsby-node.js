const path = require('path');
const XLSX = require('xlsx');
const csvtojson = require('csvtojson');
const camelcase = require('camelcase');

const gridcodeTemplate = require('./gridcode.json');

const REPORTER_PREFIX = '[solagro-awa-map] ';

const sourceTypes = {
  yc: 'yieldCompilation',
  co: 'climateObservations',
  cp: 'climateProjections',
};

exports.onCreateNode = async ({
  node,
  loadNodeContent,
  createContentDigest,
  actions: { createNode, createParentChildLink },
}) => {
  /**
   * Create nodes for each grid point dataset
   */
  if (node.sourceInstanceName === 'gridPointCSV' && node.extension === 'csv') {
    const { relativeDirectory: gridCode, name } = node;

    const shortSourceType = name.split('-')[0];
    const sourceType = sourceTypes[shortSourceType];
    const dataType = camelcase(name.substr(3));

    const csv = await loadNodeContent(node);
    const data = await csvtojson({ delimiter: ',' }).fromString(csv);
    const json = JSON.stringify(data);

    const tableNode = {
      id: `${gridCode}-${dataType}`,
      sourceType,
      dataType,
      gridCode,
      json,
      data,
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(data),
        type: 'gridPointData',
      },
    };

    await createNode(tableNode);
    await createParentChildLink({
      parent: node,
      child: tableNode,
    });
  }
};

exports.createPages = async ({ reporter, graphql, actions: { createPage, createRedirect } }) => {
  /**
   * Get all available grid codes from raw data
   */
  const { data: {
    site: { siteMetadata: { locales } },
    allGridPointData: { group: allGridCodes },
  } } = await graphql(`
    query {
      site {
        siteMetadata {
          locales
        }
      }

      allGridPointData: allGridPointData {
        group(field: gridCode) {
          gridCode: fieldValue
        }
      }
    }
  `);

  /**
   * Extract all grid codes from query result
   */
  const gridCodes = allGridCodes.map(({ gridCode }) => gridCode);

  /**
   * Output debug message to console when building
   */
  if (!gridCodes.length) {
    reporter.warn(`${REPORTER_PREFIX}No grid codes found.`);
  } else {
    reporter.info(`${REPORTER_PREFIX}${gridCodes.length} grid code found.`);
  }

  const gridPointSubpages = [
    {
      slug: 'yield-compilation',
      sourceType: 'yieldCompilation',
      component: path.resolve('./src/components/YieldCompilation.js'),
    },
    {
      slug: 'climate-observations',
      sourceType: 'climateObservations',
      component: path.resolve('./src/components/ClimateObservations.js'),
    },
    {
      slug: 'climate-projections',
      sourceType: 'climateProjections',
      component: path.resolve('./src/components/ClimateProjections.js'),
    },
  ];

  /**
   * Create page for each grid point:
   *  /{lng}/map/{gridCode}
   */
  await Promise.all(locales.map(language =>
    Promise.all(gridCodes.map(async gridCode => {
      await createRedirect({
        fromPath: `/${language}/map/${gridCode}/`,
        toPath: `/${language}/map/${gridCode}/${gridPointSubpages[0].slug}`,
        isPermanent: true,
        redirectInBrowser: true,
      });

      await Promise.all(gridPointSubpages.map(({ slug, component, sourceType }) => createPage({
        path: `/${language}/map/${gridCode}/${slug}`,
        component,
        context: {
          language,
          gridCode,
          slug,
          sourceType,
        },
      })));
    }))));

  const multiplier = locales.length * gridPointSubpages.length;
  const total = multiplier * gridCodes.length;
  reporter.info(`${REPORTER_PREFIX}${total} grid point pages created. (${multiplier}×${gridCodes.length})`);
};

/**
 * Alter webpack config to avoid loading Mapbox for pre-build/SSR
 */
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [{ test: /react-mapbox-gl/, use: loaders.null() }],
      },
    });
  }
};

/**
 * Generate template workbook used to contribute gridpoint data
 */
exports.onPostBuild = async () => {
  const workbook = XLSX.utils.book_new();

  gridcodeTemplate.forEach(({ name, aoa }) => {
    const worksheet = XLSX.utils.aoa_to_sheet(aoa);
    XLSX.utils.book_append_sheet(workbook, worksheet, name);
  });

  XLSX.writeFile(workbook, './public/gridcode.ods');
  XLSX.writeFile(workbook, './public/gridcode.xlsx');
};
