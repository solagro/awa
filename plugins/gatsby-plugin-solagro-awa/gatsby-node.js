
const { generatePagesInfos } = require('./lib/generatePages.js');

/**
 * Create main localized page
 */
exports.onCreatePage = async ({ page, actions: { createPage }, store }) => {
  /**
   * Get locales from siteMetada through global state store as graphql querying
   * is not available in onCreatePage
   */
  const { config: { siteMetadata: { locales } } } = store.getState();

  if (page.isCreatedByStatefulCreatePages) {
    /**
     * Generate same page for each locale
     */
    const i18nPages = generatePagesInfos(page, locales);

    // Create custom i18n pages
    i18nPages.map(i18nPage => createPage(i18nPage));
  }
};
