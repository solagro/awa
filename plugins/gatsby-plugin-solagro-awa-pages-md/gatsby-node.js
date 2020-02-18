const path = require('path');

exports.onCreateNode = async ({
  node,
  actions: { createPage },
}) => {
  if (node.sourceInstanceName !== 'pages' || node.extension !== 'md') {
    return;
  }

  const nameParts = node.name.split('.');
  const pagePath = nameParts.reverse().join('/');
  const [language] = nameParts;

  createPage({
    path: `/${pagePath}`,
    component: path.resolve('./src/components/MarkdownPage.js'),
    context: { language, digest: node.internal.contentDigest },
  });
};
