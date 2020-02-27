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
      results: allQuizJson(filter: {theme: {ne: "dummy"}}) {
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

  const questionsByTheme = questions
    .reduce((acc, { theme, title }) => ({
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
  }

  /**
   * Create page for each theme:
   *  /{lng}/quiz/{theme}
   */
  await Promise.all(locales.map(language =>
    Promise.all(themes.map(async theme => {
      await createPage({
        path: `/${language}/quiz/${theme}`,
        component: path.resolve('./src/components/QuizTheme.js'),
        context: {
          language,
          theme,
        },
      });

      /**
       * Create "end of quiz" page
       */
      await createPage({
        path: `/${language}/quiz/${theme}/end`,
        component: path.resolve('./src/components/QuizEnd.js'),
        context: {
          language,
          theme,
        },
      });
    }))));

  /**
   * Create page for each question:
   *  /{lng}/quiz/{theme}/{title-slug}
   */
  await Promise.all(locales.map(language =>
    Promise.all(questions.map(({ title, theme, id }) => createPage({
      path: `/${language}/quiz/${theme}/${slugify(title)}`,
      component: path.resolve('./src/components/QuizQuestion.js'),
      context: {
        language,
        theme,
        id,
        slug: slugify(title),
      },
    })))));

  const total = locales.length * questions.length;
  reporter.info(`${REPORTER_PREFIX}${total} question pages created. (${locales.length}×${questions.length})`);

  /**
   * Create page for each LearnMore:
   *  /{lng}/quiz/{theme}/{title-slug}/learn-more
   */
  const { data: { allQuizJsonMarkdown: { nodes } } } = await graphql(`
    {
      allQuizJsonMarkdown(
        filter: {
          type: { eq: "learn-more" }
        }
      ) {
        nodes {
          language
          parent {
            ... on QuizJson {
              theme
              title
              id
            }
          }
        }
      }
    }
  `);

  nodes.forEach(({ language, parent: { theme, title, id } }) => {
    if (theme === 'dummy') { return; }

    createPage({
      path: `/${language}/quiz/${theme}/${slugify(title)}/learn-more`,
      component: path.resolve('./src/components/LearnMorePage.js'),
      context: {
        language,
        theme,
        id,
        slug: slugify(title),
      },
    });
  });
};
