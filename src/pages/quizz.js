import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useStaticQuery, graphql } from 'gatsby';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SEO from '../components/Seo';
import Link from '../components/Link';
import Layout from '../components/Layout';
import doRedirect from '../hoc/doRedirect';

const QuizzPage = ({ location: { pathname } }) => {
  const { t, i18n } = useTranslation();

  const { results: { questions = [] } = {} } = useStaticQuery(graphql`
    {
      results: allQuizzJson(sort: {fields: order}) {
        questions: nodes {
          theme
          fields {
            slug
          }
        }
      }
    }
  `);

  /**
   * Get first question of each theme
   */
  const firstQuestions = questions.reduce((acc, { theme, fields: { slug } }) =>
    (acc[theme] ? acc : { ...acc, [theme]: slug }), {});

  /**
   * Build array of themes
   */
  const themes = Object.keys(firstQuestions);

  return (
    <Layout>
      <SEO title={t('Quizz')} lang={i18n.language} />

      <Typography variant="h1" gutterBottom>
        {t('Main title of quizz page')}
      </Typography>

      <Typography variant="h2" gutterBottom>
        {t('Subtitle of quizz page')}
      </Typography>

      <Typography variant="body1">
        <Trans>
          Introduction or description of quizz initial choice
        </Trans>
      </Typography>

      {themes.map(theme => (
        <Button
          key={theme}
          component={Link}
          to={`${pathname}/${theme}/${firstQuestions[theme]}`}
          variant="outlined"
        >
          {theme}
        </Button>
      ))}
    </Layout>
  );
};

export default doRedirect(QuizzPage);
