/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const languages = ['en', 'de', 'es', 'et', 'fr'];

/**
 * Generate a custom page informations
 * @param  {Object} defaultInfos  Default informations generated by Gatsby
 * @return {Object}               Customized page object
 */
const generatePagesInfos = ({ path: pathPath, ...defaultInfos } = {}, lngs = []) =>
  lngs.map(language => ({
    ...defaultInfos,
    context: {
      language,
      namespace: 'default',
    },
    path: `/${language}${pathPath}`,
  }));

exports.onCreatePage = async ({ page, actions: { createPage } }) => {
  const i18nPages = generatePagesInfos(page, languages);

  // Create custom i18n pages
  i18nPages.map(i18nPage => createPage(i18nPage));
};
