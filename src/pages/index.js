import React from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '@material-ui/core/Typography';

import SEO from '../components/Seo';
import Layout from '../components/Layout';
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

      <Typography variant="h2" gutterBottom>
        {t('Map block')}
      </Typography>

      <Typography variant="h2" gutterBottom>
        {t('Adaptations block')}
      </Typography>
    </Layout>
  );
};

export default IndexPage;
