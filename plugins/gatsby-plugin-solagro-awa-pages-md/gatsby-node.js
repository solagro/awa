const path = require('path');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const { data: { wrapper: { pages = [] } = {} } = {} } = await graphql(`
    query {
      wrapper: allFile(filter: {
        sourceInstanceName: { eq: "pages" },
        extension: { eq: "md" }
      }) {
        pages: nodes {
          name
          internal { contentDigest }
        }
      }
    }
  `);

  pages.forEach(page => {
    const nameParts = page.name.split('.');
    const pagePath = nameParts.reverse().join('/');
    const [language] = nameParts;

    createPage({
      path: `/${pagePath}`,
      component: path.resolve('./src/components/MarkdownPage.js'),
      context: { language, digest: page.internal.contentDigest },
    });
  });
};
