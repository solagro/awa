import React from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '@material-ui/core/Typography';

import SEO from './Seo';
import Layout from './Layout';
import doRedirect from '../hoc/doRedirect';

const QuizzQuestion = ({ pageContext }) => {
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <SEO title={t('Quizz')} lang={i18n.language} />

      <Typography variant="h1" gutterBottom>
        {t('Quizz question page')}
      </Typography>

      <pre>
        {JSON.stringify(pageContext, null, 2)}
      </pre>

    </Layout>
  );
};

export default doRedirect(QuizzQuestion);
