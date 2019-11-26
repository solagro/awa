import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import Typography from '@material-ui/core/Typography';

import SEO from '../components/Seo';
import Layout from '../components/Layout';
import doRedirect from '../hoc/doRedirect';

const LegalPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <SEO title={t('Legal')} lang={i18n.language} />
      <Typography variant="h1" gutterBottom>
        {t('Main title of legal page')}
      </Typography>

      <Typography variant="h2" gutterBottom>
        {t('Subtitle of legal page')}
      </Typography>

      <Typography variant="body1">
        <Trans>
          Introduction or description of legal
        </Trans>
      </Typography>

      <pre>legal menu</pre>
    </Layout>
  );
};

export default doRedirect(LegalPage);
