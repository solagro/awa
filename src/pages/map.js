import React from 'react';
import { useTranslation } from 'react-i18next';

import SEO from '../components/Seo';
import Layout from '../components/Layout';
import doRedirect from '../hoc/doRedirect';
import Map from '../components/Map';

const MapPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <Layout maximize>
      <SEO title={t('Map')} lang={i18n.language} />
      <Map />
    </Layout>
  );
};

export default doRedirect(MapPage);
