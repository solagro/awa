
const { generatePagesInfos } = require('./lib/generatePages.js');

/**
 * Create main localized page
 */
exports.onCreatePage = async ({ page, actions: { createPage }, store }) => {
  const { config: { siteMetadata: { locales } } } = store.getState();

  if (page.isCreatedByStatefulCreatePages) {
    const i18nPages = generatePagesInfos(page, locales);

    // Create custom i18n pages
    i18nPages.map(i18nPage => createPage(i18nPage));
  }
};
