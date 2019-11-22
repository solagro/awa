const path = require('path');
const csvtojson = require('csvtojson');
const camelcase = require('camelcase');

const REPORTER_PREFIX = '[solagro-awa-quizz-map] ';

const { removeNumberPrefix } = require('./lib/helpers');

const cleanName = str => camelcase(removeNumberPrefix(str));

exports.onCreateNode = async ({
  node,
  loadNodeContent,
  createContentDigest,
  actions: { createNode, createParentChildLink },
}) => {
  /**
   * Create nodes for each grid point dataset
   */
  if (node.sourceInstanceName === 'gridpoint' && node.extension === 'csv') {
    const { relativeDirectory, name } = node;

    /**
     * XXXXX/XX_source_type/
     */
    const [, dir] = relativeDirectory.split('/');

    const sourceType = cleanName(dir);
    const dataType = cleanName(name);

    const csv = await loadNodeContent(node);
    const json = await csvtojson({ delimiter: ';' }).fromString(csv);

    json.forEach(csvLine => {
      const newNode = {
        id: `${dataType}-${csvLine.year}-${csvLine.id}`,
        sourceType,
        dataType,
        gridCode: csvLine.id,
        year: +csvLine.year,

        allData: csvLine,

        parent: node.id,
        internal: {
          contentDigest: createContentDigest(csvLine),
          type: 'gridPointData',
        },
      };

      createNode(newNode);
      createParentChildLink({
        parent: node,
        child: newNode,
      });
    });
  }
};

exports.createPages = async ({ reporter, graphql, actions: { createPage } }) => {
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

      allGridPointData {
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

  /**
   * Create page for each grid point:
   *  /{lng}/map/{gridCode}
   */
  await Promise.all(locales.map(language =>
    Promise.all(gridCodes.map(gridCode => createPage({
      path: `/${language}/map/${gridCode}`,
      component: path.resolve('./src/components/GridCode.js'),
      context: {
        language,
        gridCode,
      },
    })))));

  reporter.info(`${REPORTER_PREFIX}${locales.length * gridCodes.length} grid point pages created.`);
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
