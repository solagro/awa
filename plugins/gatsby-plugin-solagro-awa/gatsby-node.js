const path = require('path');
const slugify = require('slugify');

const { generatePagesInfos } = require('./lib/generatePages.js');

/**
 * Create main localized page
 */
exports.onCreatePage = async (
  { page, actions: { createPage } },
  // plugin options
  { locales },
) => {
  const i18nPages = generatePagesInfos(page, locales);

  // Create custom i18n pages
  i18nPages.map(i18nPage => createPage(i18nPage));
};

/**
 * Create all quizz content pages
 */
exports.createPages = async (
  { graphql, actions },
  // plugin options
  { locales = [] },
) => {
  const { createPage } = actions;

  const { data: { results: { questions } } } = await graphql(`
    query {
      results: allQuizzJson {
        questions: nodes {
          id
          theme
          title
        }
      }
    }
  `);

  const questionsByTheme = questions.reduce((acc, { theme, title }) => ({
    ...acc,
    [theme]: [...(acc[theme] || []), title],
  }), {});

  const themes = Object.keys(questionsByTheme);

  /**
   * Create page for each theme:
   *  /{lng}/quizz/{theme}
   */
  await Promise.all(locales.map(language =>
    Promise.all(themes.map(theme => createPage({
      path: `/${language}/quizz/${theme}`,
      component: path.resolve('./src/components/QuizzTheme.js'),
      context: {
        language,
        theme,
      },
    })))));

  /**
   * Create page for each question:
   *  /{lng}/quizz/{theme}/{title-slug}
   */
  await Promise.all(locales.map(language =>
    Promise.all(questions.map(({ title, theme, id }) => createPage({
      path: `/${language}/quizz/${theme}/${slugify(title)}`,
      component: path.resolve('./src/components/QuizzQuestion.js'),
      context: {
        language,
        theme,
        id,
        slug: slugify(title),
      },
    })))));
};

/**
 * Alter webpack config to avoid loading Mapbox for pre-build/SSR
 */
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [{ test: /react-mapbox-gl/, use: loaders.null() }],
      },
    });
  }
};
