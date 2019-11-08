import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

import SEO from './Seo';
import Link from './Link';
import Layout from './Layout';
import doRedirect from '../hoc/doRedirect';

const QuizzThemePage = ({ pageContext: { theme }, data, location: { pathname } }) => {
  const { t, i18n } = useTranslation();

  const { allQuizzJson: { questions = [] } = {} } = data;

  return (
    <Layout>
      <SEO title={t('Quizz')} lang={i18n.language} />

      <Typography variant="h1" gutterBottom>
        {t('Quizz theme page')}
        {' '}
        {theme}
      </Typography>

      <ul>
        {questions.map(({ title, fields: { slug } }) => (
          <li>
            <Link to={`${pathname}/${slug}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query questionsQuery($theme: String) {
    allQuizzJson(
      filter: {theme: {eq: $theme}},
      sort: {fields: order, order: ASC}
    ) {
      questions: nodes {
        theme
        title
        id
        fields {
          slug
        }
      }
    }
  }

`;

export default doRedirect(QuizzThemePage);
