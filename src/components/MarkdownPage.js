import React from 'react';

import { graphql } from 'gatsby';

import Layout from './Layout';
import MarkdownText from './MarkdownText';

import doRedirect from '../hoc/doRedirect';

const MarkdownPage = props => {
  const {
    data: { file: { childMarkdownRemark: { htmlAst } } },
  } = props;
  return (
    <Layout>
      <MarkdownText hast={htmlAst} />
    </Layout>
  );
};

export default doRedirect(MarkdownPage);

export const query = graphql`
  query ($digest: String) {
    file(internal: {contentDigest: {eq: $digest}}) {
      id
      childMarkdownRemark {
        htmlAst
      }
    }
  }
`;
