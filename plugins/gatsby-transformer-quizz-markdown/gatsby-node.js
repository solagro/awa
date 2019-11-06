const path = require('path');

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
      if (node[element]) {
        const id = `${node.id}-Markdown${element}`;

        createNode({
          id,
          parent: node.id,
          dir: path.resolve('./'),
          internal: {
            type: `${node.internal.type}Markdown${element}`,
            mediaType: 'text/markdown',
            content: node[element],
            contentDigest: createContentDigest(node[element]),
          },
        });

        // Create relation between source node created node
        createNodeField({
          node,
          name: `markdown${element}___NODE`,
          value: id,
        });
      }

      if (node[`${element}-i18n`].length) {
        node[`${element}-i18n`].forEach(({ language, [element]: text }) => {
          const id = `${node.id}-Markdown${element}${language}`;

          createNode({
            id,
            parent: node.id,
            dir: path.resolve('./'),
            internal: {
              type: `${node.internal.type}Markdown${element}${language}`,
              mediaType: 'text/markdown',
              content: text,
              contentDigest: createContentDigest(text),
            },
          });

          // Create relation between source node created node
          createNodeField({
            node,
            name: `markdown${element}${language}___NODE`,
            value: id,
          });
        });
      }
    });
  }
};
