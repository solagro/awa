import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import Layout from '../components/Layout';
import SEO from '../components/Seo';

const NotFoundPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <SEO title={t('404: Not found')} lang={i18n.language} />

      <Trans>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Trans>
    </Layout>
  );
};

export default NotFoundPage;
