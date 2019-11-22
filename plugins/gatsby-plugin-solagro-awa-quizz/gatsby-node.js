const path = require('path');
const slugify = require('slugify');

const REPORTER_PREFIX = '[solagro-awa-quizz] ';

/**
 * Create all quizz content pages
 */
exports.createPages = async ({ reporter, graphql, actions: { createPage } }) => {
  const {
    data: {
      results: { questions },
      site: { siteMetadata: { locales } },
    },
  } = await graphql(`
    query {
      results: allQuizzJson {
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

  reporter.info(`${REPORTER_PREFIX}${locales.length * themes.length} theme landing pages created`);

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

  reporter.info(`${REPORTER_PREFIX}${locales.length * questions.length} question pages created`);
};
