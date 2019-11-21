const csvtojson = require('csvtojson');
const camelcase = require('camelcase');

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

exports.createPages = async () => {
  /**
   * Create page for each grid code
   */
  // TODO
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
