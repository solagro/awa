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
    reporter.info(`${REPORTER_PREFIX}Creating langing pages for ${themes.length} themes. (${themes.join(', ')})`);
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

  reporter.info(`${REPORTER_PREFIX}${locales.length * themes.length} theme landing pages created`);

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

  reporter.info(`${REPORTER_PREFIX}${locales.length * questions.length} question pages created`);


  const cap = ([init, ...rest]) => `${init.toUpperCase()}${rest}`;

  /**
   * Create page for each LearnMore:
   *  /{lng}/quiz/{theme}/{title-slug}/learn-more
   */
  const queryRawResults = await Promise.all(locales.map(language => graphql(`
    {
      ${language}: allQuizJsonMarkdownLearnMore${cap(language)} {
        nodes {
          parent {
            ... on QuizJson {
              theme
              title
            }
          }
        }
      }
    }
  `)));
  const items = queryRawResults.reduce((store, { data }) => ({ ...store, ...data }), {});

  Object.entries(items).forEach(([language, { nodes = [] }]) => {
    nodes.forEach(({ parent: { theme, title } }) => {
      createPage({
        path: `/${language}/quiz/${theme}/${slugify(title)}/learn-more`,
        component: path.resolve('./src/components/DebugPage.js'),
        context: {
          language,
          theme,
          slug: slugify(title),
        },
      });
    });
  });
};
