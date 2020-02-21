const path = require('path');
const slugify = require('slugify');
const camelcase = require('camelcase');

const capitalize = value => camelcase(value, { pascalCase: true });

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
  if (node.internal.type === 'QuizJson') {
    await createNodeField({
      node,
      name: 'slug',
      value: slugify(node.title),
    });


    await Promise.all(['question', 'explanation', 'learn-more'].map(async element => {
      const content = node[element];

      if (content) {
        const id = `${node.id}-Markdown${capitalize(element)}En`;

        await createNode({
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
        await createNodeField({
          node,
          name: `markdown${capitalize(element)}En___NODE`,
          value: id,
        });
      }

      if (node[`${element}-i18n`] && node[`${element}-i18n`].length) {
        await Promise.all(node[`${element}-i18n`].map(async ({ language, [element]: contentInt }) => {
          const id = `${node.id}-Markdown${capitalize(element)}${capitalize(language)}`;

          await createNode({
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
          await createNodeField({
            node,
            name: `markdown${capitalize(element)}${capitalize(language)}___NODE`,
            value: id,
          });
        }));
      }
    }));
  }
};
