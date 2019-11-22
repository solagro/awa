const { generatePagesInfos } = require('./lib/helpers.js');

const REPORTER_PREFIX = '[solagro-awa] ';

/**
 * Create main localized page
 */
exports.onCreatePage = async ({ reporter, page, actions: { createPage }, store }) => {
  /**
   * Get locales from siteMetada through global state store as graphql querying
   * is not available in onCreatePage
   */
  const { config: { siteMetadata: { locales } } } = store.getState();

  if (!locales.length) {
    reporter.warn(`${REPORTER_PREFIX}No locales found! Can't create localized pages`);
    return;
  }

  if (page.isCreatedByStatefulCreatePages) {
    /**
     * Generate same page for each locale
     */
    const i18nPages = generatePagesInfos(page, locales);

    // Create custom i18n pages
    i18nPages.map(i18nPage => createPage(i18nPage));
  }
};
