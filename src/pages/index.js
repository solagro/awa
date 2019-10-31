import React from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SEO from '../components/Seo';
import Layout from '../components/Layout';
import Link from '../components/Link';
import i18n from '../i18n';

const IndexPage = ({ pageContext }) => {
  const { t } = useTranslation();

  if (pageContext.language !== i18n.language) {
    i18n.changeLanguage(pageContext.language);
  }

  return (
    <Layout>
      <SEO title="Home" />

      <SEO title="Quizz" />
      <Typography variant="h1">
        {t('Main title of home page')}
      </Typography>

      <Typography variant="h2" gutterBottom>
        {t('Quizz block')}
      </Typography>

      <Button variant="contained" color="primary" component={Link} to="/quizz">
        {t('Start quizz')}
      </Button>

      <Typography variant="h2" gutterBottom>
        {t('Map block')}
      </Typography>

      <Button variant="contained" color="primary" component={Link} to="/quizz">
        {t('Go to the map')}
      </Button>

      <Typography variant="h2" gutterBottom>
        {t('Adaptations block')}
      </Typography>

      <Button variant="contained" color="primary" component={Link} to="/quizz">
        {t('See mesures')}
      </Button>

      <Typography variant="h2" gutterBottom>
        {t('Summary')}
      </Typography>

      <Button variant="contained" color="primary" component={Link} to="/quizz">
        {t('Start quizz')}
      </Button>
    </Layout>
  );
};

export default IndexPage;
