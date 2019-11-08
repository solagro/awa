const path = require('path');

const capitalize = ([f, ...rest]) => `${f.toUpperCase()}${rest.join``}`;

/**
 * Transform JSON nodes created through gatsby-transformer-json
 * to multiple text/markdown nodes that will be then transformed
 * by gatsby-transformer-remark to nodes with html content
 *
 *   <JSON file>
 *   -> gatsby-source-filesystem  -> <node file>
 *   -> gatsby-transformer-json   -> <node JSON>
 *   -> current transformation    -> <nodes with text/markdown content>
 *   -> gatsby-transformer-remark -> <node with HTML content>
 */
exports.onCreateNode = async ({
  node,
  createContentDigest,
  actions: { createNode, createNodeField },
}) => {
  if (node.internal.type === 'QuizzJson') {
    ['question', 'explanation'].forEach(element => {
      const content = node[element];

      if (content) {
        const id = `${node.id}-Markdown${capitalize(element)}En`;

        createNode({
          id,
          parent: node.id,
          dir: path.resolve('./'),
          internal: {
            type: `${node.internal.type}Markdown${capitalize(element)}En`,
            mediaType: 'text/markdown',
            content,
            contentDigest: createContentDigest(content),
          },
        });

        // Create relation between source node created node
        createNodeField({
          node,
          name: `markdown${capitalize(element)}En___NODE`,
          value: id,
        });
      }

      if (node[`${element}-i18n`].length) {
        node[`${element}-i18n`].forEach(({ language, [element]: contentInt }) => {
          const id = `${node.id}-Markdown${capitalize(element)}${capitalize(language)}`;

          createNode({
            id,
            parent: node.id,
            dir: path.resolve('./'),
            internal: {
              type: `${node.internal.type}Markdown${capitalize(element)}${capitalize(language)}`,
              mediaType: 'text/markdown',
              content: contentInt,
              contentDigest: createContentDigest(contentInt),
            },
          });

          // Create relation between source node created node
          createNodeField({
            node,
            name: `markdown${capitalize(element)}${capitalize(language)}___NODE`,
            value: id,
          });
        });
      }
    });
  }
};
