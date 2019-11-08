import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useStaticQuery, graphql } from 'gatsby';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SEO from '../components/Seo';
import Link from '../components/Link';
import Layout from '../components/Layout';
import doRedirect from '../hoc/doRedirect';

const QuizzPage = () => {
  const { t, i18n } = useTranslation();

  const { results: { questions } } = useStaticQuery(graphql`
    query {
      results: allQuizzJson {
        questions: nodes {
          theme
        }
      }
    }
  `);

  const themes = questions.reduce((acc, { theme }) =>
    (!acc.includes(theme) ? [...acc, theme] : acc), []);

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
          to={`/quizz/${theme}`}
          variant="outlined"
        >
          {theme}
        </Button>
      ))}
    </Layout>
  );
};

export default doRedirect(QuizzPage);
