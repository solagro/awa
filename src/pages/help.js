import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import Typography from '@material-ui/core/Typography';

import SEO from '../components/Seo';
import Layout from '../components/Layout';
import CSVGenerator from '../components/CSVGenerator';
import doRedirect from '../hoc/doRedirect';

const HelpPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <SEO title={t('Help')} lang={i18n.language} />

      <Typography variant="h1" gutterBottom>
        {t('Help')}
      </Typography>

      <Typography variant="h2" gutterBottom>
        {t('Tips & tools for using site website.')}
      </Typography>

      <Typography variant="body1" gutterBottom>
        <Trans>
          Introduction or description of help page
        </Trans>
      </Typography>

      <Typography variant="h3" gutterBottom>
        {t('CSV generator')}
      </Typography>

      <CSVGenerator />

      <pre>legal menu</pre>
    </Layout>
  );
};

export default doRedirect(HelpPage);
