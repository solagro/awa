const path = require('path');
const csvtojson = require('csvtojson');
const camelcase = require('camelcase');

const REPORTER_PREFIX = '[solagro-awa-quizz-map] ';

const { removeNumberPrefix } = require('./lib/helpers');

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
    const [, dir] = relativeDirectory.split('/');

    const nodeType = camelcase(removeNumberPrefix(dir));
    const csv = await loadNodeContent(node);
    const cleanName = camelcase(removeNumberPrefix(name));

    const json = await csvtojson({
      delimiter: ';',
    }).fromString(csv);

    json.forEach(csvLine => {
      const newNode = {
        id: `${cleanName}-${csvLine.year}-${csvLine.id}`,
        category: cleanName,
        gridCode: csvLine.id,
        year: +csvLine.year,

        allData: csvLine,

        parent: node.id,
        internal: {
          contentDigest: createContentDigest(csvLine),
          type: nodeType,
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
  const { data: { site: { siteMetadata: { locales } } } } = await graphql(`
    query {
      site {
        siteMetadata {
          locales
        }
      }
    }
  `);

  /**
   * Get all available grid codes from raw data
   */
  const { data } = await graphql(`
    query {
      allYieldCompilation {
        group(field: gridCode) {
          gridCode: fieldValue
        }
      }

      allClimateObservation {
        group(field: gridCode) {
          gridCode: fieldValue
        }
      }

      allClimateProjections {
        group(field: gridCode) {
          gridCode: fieldValue
        }
      }
    }
  `);

  /**
   * Extract all grid codes from query result
   */
  const duplicatedGridCodes = Object.values(data)
    .reduce((acc, curr) => ([
      ...acc,
      ...curr.group.map(({ gridCode }) => gridCode),
    ]), []);

  /**
   * Dedup grid codes
   */
  const gridCodes = Array.from(new Set(duplicatedGridCodes));

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
