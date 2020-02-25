const path = require('path');
const slugify = require('slugify');

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

    const contents = [];
    ['question', 'explanation', 'learn-more'].forEach(type => {
      if (node[type]) {
        contents.push({ language: 'en', type, content: node[type] });
      }

      const translations = node[`${type}-i18n`];
      if (translations && translations.length) {
        translations.forEach(({ language, [type]: content }) => {
          contents.push({ language, content, type });
        });
      }
    });

    contents.forEach(({ language, content, type }) => {
      createNode({
        id: `${node.id}-${type}-${language}`,
        parent: node.id,
        language,
        type,
        dir: path.resolve('./'),
        internal: {
          type: `${node.internal.type}Markdown`,
          mediaType: 'text/markdown',
          content,
          contentDigest: createContentDigest(content),
        },
      });
    });
  }
};
