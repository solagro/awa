const path = require('path');
const csvtojson = require('csvtojson');
const camelcase = require('camelcase');

const REPORTER_PREFIX = '[solagro-awa-quiz-map] ';

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

    json.forEach(({ id: gridCode, year, ...csvLineData }) => {
      const lineNode = {
        id: `${dataType}-${gridCode}-${year}`,
        sourceType,
        dataType,
        gridCode,
        year,
        keys: Object.keys(csvLineData),
        values: Object.values(csvLineData),

        parent: node.id,
        internal: {
          contentDigest: createContentDigest(csvLineData),
          type: 'gridPointDataLine',
        },
      };

      /**
       * Create graphql node for each CSV line
       */
      createNode(lineNode);
      createParentChildLink({
        parent: node,
        child: lineNode,
      });

      Object.entries(csvLineData).forEach(([key, value], colIndex) => {
        const cellNode = {
          id: `${dataType}-${gridCode}-${year}-${colIndex}`,
          sourceType,
          dataType,
          gridCode,
          year,
          key,
          value: +(value.replace(',', '.')),
          colIndex,

          parent: lineNode.id,
          internal: {
            contentDigest: createContentDigest({ key, value }),
            type: 'gridPointDataCell',
          },
        };

        /**
         * Create graphql node for each CSV cell
         */
        createNode(cellNode);
        createParentChildLink({
          parent: lineNode,
          child: cellNode,
        });
      });
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

      allGridPointData: allGridPointDataLine {
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
      slug: 'climate-observation',
      sourceType: 'climateObservation',
      component: path.resolve('./src/components/ClimateObservation.js'),
    },
    {
      slug: 'climate-projections',
      sourceType: 'climateProjections',
      component: path.resolve('./src/components/ClimateProjection.js'),
    },
  ];

  /**
   * Create page for each grid point:
   *  /{lng}/map/{gridCode}
   */
  locales.forEach(language =>
    gridCodes.forEach(gridCode => {
      createRedirect({
        fromPath: `/${language}/map/${gridCode}/`,
        toPath: `/${language}/map/${gridCode}/${gridPointSubpages[0].slug}`,
        isPermanent: true,
        redirectInBrowser: true,
      });

      gridPointSubpages.forEach(({ slug, component, sourceType }) => createPage({
        path: `/${language}/map/${gridCode}/${slug}`,
        component,
        context: {
          language,
          gridCode,
          slug,
          sourceType,
        },
      }));
    }));

  reporter.info(`${REPORTER_PREFIX}${locales.length}(locales)×${gridCodes.length}(gridPoints)×${gridPointSubpages.length}(tabs) grid point pages created.`);
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
