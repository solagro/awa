import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import Typography from '@material-ui/core/Typography';

import SEO from '../components/Seo';
import Layout from '../components/Layout';
import doRedirect from '../hoc/doRedirect';

const AdaptationsPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <SEO title={t('Adaptations')} lang={i18n.language} />
      <Typography variant="h1" gutterBottom>
        {t('Main title of adaptations page')}
      </Typography>

      <Typography variant="h2" gutterBottom>
        {t('Subtitle of adaptations page')}
      </Typography>

      <Typography variant="body1">
        <Trans>
          Introduction or description of adaptations
        </Trans>
      </Typography>

      <pre>Adaptations menu</pre>
    </Layout>
  );
};

export default doRedirect(AdaptationsPage);
