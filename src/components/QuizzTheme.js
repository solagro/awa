import React from 'react';
import { useTranslation } from 'react-i18next';
// import { useStaticQuery, graphql } from 'gatsby';

import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

import SEO from './Seo';
// import Link from './Link';
import Layout from './Layout';
import doRedirect from '../hoc/doRedirect';

const QuizzThemePage = ({ pageContext: { theme } }) => {
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <SEO title={t('Quizz')} lang={i18n.language} />

      <Typography variant="h1" gutterBottom>
        {t('Quizz theme page')}
        {theme}
      </Typography>

    </Layout>
  );
};

export default doRedirect(QuizzThemePage);
