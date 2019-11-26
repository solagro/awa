const path = require('path');
const slugify = require('slugify');

const REPORTER_PREFIX = '[solagro-awa-quiz] ';

/**
 * Create all quiz content pages
 */
exports.createPages = async ({ reporter, graphql, actions: { createPage } }) => {
  const {
    data: {
      results: { questions },
      site: { siteMetadata: { locales } },
    },
  } = await graphql(`
    query {
      results: allQuizJson {
        questions: nodes {
          id
          theme
          title
        }
      }

      site {
        siteMetadata {
          locales
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
   * Output debug message to console when building
   */
  if (!questions.length) {
    reporter.warn(`${REPORTER_PREFIX}No question found.`);
  } else {
    reporter.info(`${REPORTER_PREFIX}${questions.length} questions found.`);
    reporter.info(`${REPORTER_PREFIX}Creating langing pages for ${themes.length} themes. (${themes.join(', ')})`);
  }

  /**
   * Create page for each theme:
   *  /{lng}/quiz/{theme}
   */
  locales.forEach(language =>
    themes.forEach(theme => createPage({
      path: `/${language}/quiz/${theme}`,
      component: path.resolve('./src/components/QuizTheme.js'),
      context: {
        language,
        theme,
      },
    })));

  reporter.info(`${REPORTER_PREFIX}${locales.length * themes.length} theme landing pages created`);

  /**
   * Create page for each question:
   *  /{lng}/quiz/{theme}/{title-slug}
   */
  locales.forEach(language =>
    questions.forEach(({ title, theme, id }) => createPage({
      path: `/${language}/quiz/${theme}/${slugify(title)}`,
      component: path.resolve('./src/components/QuizQuestion.js'),
      context: {
        language,
        theme,
        id,
        slug: slugify(title),
      },
    })));

  reporter.info(`${REPORTER_PREFIX}${locales.length * questions.length} question pages created`);
};
