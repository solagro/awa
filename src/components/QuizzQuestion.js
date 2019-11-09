import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Typography from '@material-ui/core/Typography';

import QuizzButton from './QuizzButton';
import SEO from './Seo';
import Layout from './Layout';

import doRedirect from '../hoc/doRedirect';

const capitalize = text => text[0].toUpperCase() + text.slice(1);

const QuizzQuestion = ({
  pageContext,
  pageContext: { id, theme },
  data: {
    questionSeries: { questions = [] } = {},
    question: {
      answers,
      answer_i18n: answersI18n,
      fields,
    },
  },
  // data,
}) => {
  const { t, i18n } = useTranslation();

  const currentIndex = questions.findIndex(({ id: currId }) => (currId === id));
  const previousQuestion = questions[currentIndex - 1];
  const nextQuestion = questions[currentIndex + 1];

  return (
    <Layout>
      <SEO title={t('Quizz')} lang={i18n.language} />

      <Typography variant="h1" gutterBottom>
        {t('Quizz question page')}
      </Typography>

      <QuizzButton theme={theme} question={previousQuestion}>
        {t('Previous question')}
      </QuizzButton>

      <QuizzButton theme={theme} question={nextQuestion}>
        {t('Next question')}
      </QuizzButton>

      <pre>
        {JSON.stringify(pageContext, null, 2)}
      </pre>
    </Layout>
  );
};

export const query = graphql`
  query ($theme: String, $id: String) {
    questionSeries: allQuizzJson(
      filter: {theme: {eq: $theme}},
      sort: {fields: order, order: ASC}
    ) {
      questions: nodes {
        title
        id
        fields { slug }
      }
    }

    question: quizzJson(id: {eq: $id}) {
      answers
      answer_i18n { answers language }

      fields {
        markdownQuestionDe { childMarkdownRemark { html } }
        markdownQuestionEn { childMarkdownRemark { html } }
        markdownQuestionEs { childMarkdownRemark { html } }
        markdownQuestionEt { childMarkdownRemark { html } }
        markdownQuestionFr { childMarkdownRemark { html } }

        markdownExplanationDe { childMarkdownRemark { html } }
        markdownExplanationEn { childMarkdownRemark { html } }
        markdownExplanationEs { childMarkdownRemark { html } }
        markdownExplanationEt { childMarkdownRemark { html } }
        markdownExplanationFr { childMarkdownRemark { html } }
      }
    }
  }
`;

export default doRedirect(QuizzQuestion);
