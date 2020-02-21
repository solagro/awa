import React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import Layout from './Layout';
import Link from './Link';
import MarkdownText from './MarkdownText';

import doRedirect from '../hoc/doRedirect';

const capitalize = text => text[0].toUpperCase() + text.slice(1);

const useStyles = makeStyles({
  layout: {
    padding: '0 4em',
  },
  actions: {
    textAlign: 'center',
    marginBottom: '3em',
  },
});

const LearnMorePage = ({
  data: { question: { fields } },
  pageContext: { theme, slug },
}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  let content = fields.markdownLearnMoreEn;
  if (fields[`markdownLearnMore${capitalize(i18n.language)}`]) {
    content = fields[`markdownLearnMore${capitalize(i18n.language)}`];
  }

  return (
    <Layout modalWidth={950}>
      <MarkdownText
        hast={content.childMarkdownRemark.htmlAst}
        className={classes.layout}
      />

      <Box className={classes.actions}>
        <Button
          variant="outlined"
          component={Link}
          to={`/quiz/${theme}/${slug}`}
        >
          {t('Back to question')}
        </Button>
      </Box>
    </Layout>
  );
};

export default doRedirect(LearnMorePage);

export const query = graphql`
  query ($id: String!) {
    question: quizJson(id: {eq: $id}) {
      fields {
        markdownLearnMoreDe { childMarkdownRemark { htmlAst } }
        markdownLearnMoreEn { childMarkdownRemark { htmlAst } }
        markdownLearnMoreEs { childMarkdownRemark { htmlAst } }
        markdownLearnMoreEt { childMarkdownRemark { htmlAst } }
        markdownLearnMoreFr { childMarkdownRemark { htmlAst } }
      }
    }
  }
`;
