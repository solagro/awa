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
  data: { quizJsonMarkdown: { markdown: { htmlAst: content = {} } = {} } = {} },
  pageContext: { theme, slug },
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Layout modalWidth={950}>
      <MarkdownText
        hast={content}
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
  query ($id: String, $language: String) {
    quizJsonMarkdown(
      parent: { id: { eq: $id } },
      language: { eq: $language },
      type: { eq: "learn-more" }
    ) {
      markdown: childMarkdownRemark { html htmlAst }
    }
  }
`;
