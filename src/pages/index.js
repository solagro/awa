import React from 'react';

import { useTranslation } from 'react-i18next';

import Divider from '@material-ui/core/Divider';

import SEO from '../components/seo';
import Layout from '../components/layout';

import i18n from '../i18n';

const IndexPage = ({ pageContext }) => {
  const { t } = useTranslation();

  if (pageContext.language !== i18n.language) {
    i18n.changeLanguage(pageContext.language);
  }

  return (
    <Layout>
      <SEO title="Home" />
      <h1>{t('pif')}</h1>
      <pre>{JSON.stringify(pageContext, null, 2)}</pre>
      <Divider />
    </Layout>
  );
};

export default IndexPage;
