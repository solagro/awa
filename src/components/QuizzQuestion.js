import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import QuizzButton from './QuizzButton';
import SEO from './Seo';
import Layout from './Layout';

import doRedirect from '../hoc/doRedirect';
import { GlobalDispatchContext, GlobalStateContext } from './GlobalContextProvider';
import { processQuizzTexts } from '../lib/quizzHelpers';

const useStyles = makeStyles({
  answer: {
    margin: '.25em auto',
    padding: '1em',
    width: 400,
    border: '4px solid transparent',
    transition: 'border 2500ms ease',
  },
  valid: {
    borderColor: 'green',
  },
  invalid: {
    borderColor: 'red',
  },
  userChoice: {
    backgroundColor: 'silver',
  },
});

const QuizzQuestion = ({
  pageContext: { id, theme },
  data: {
    questionSeries: { questions = [] } = {},
    question: rawQuestion,
  },
}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const dispatch = React.useContext(GlobalDispatchContext);
  const {
    answers: { [theme]: givenAnswers } = {},
  } = React.useContext(GlobalStateContext) || {};

  const isAnswered = !!givenAnswers && (typeof givenAnswers[id] !== 'undefined');
  const givenAnswer = givenAnswers && givenAnswers[id] && givenAnswers[id].index;

  const currentIndex = questions.findIndex(({ id: currId }) => (currId === id));
  const previousQuestion = questions[currentIndex - 1];
  const nextQuestion = questions[currentIndex + 1];

  const { question, answers, explanation } = processQuizzTexts(rawQuestion, i18n);

  return (
    <Layout>
      <SEO title={t('Quizz')} lang={i18n.language} />

      <Typography variant="h1" gutterBottom>
        {t('Quizz question page')}
      </Typography>

      <Typography variant="h3" component="h2">
        {t('Question')}
      </Typography>

      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{ __html: question }}
      />

      <Typography variant="h4" component="h3">
        {t('Proposals')}
      </Typography>

      {answers.map(({ text, valid }, index) => (
        <div
          key={text}
          className={clsx({
            [classes.answer]: true,
            [classes.valid]: isAnswered && valid,
            [classes.invalid]: isAnswered && !valid,
            [classes.userChoice]: givenAnswer === index,
          })}
        >
          <Button
            variant="contained"
            onClick={() => dispatch({
              type: 'ANSWER',
              payload: { id, theme, index, valid },
            })}
            // disabled={isAnswered}
          >
            {text}
          </Button>
        </div>
      ))}

      <Typography variant="h3" component="h2">
        {t('Explanation')}
      </Typography>

      <Typography
        variant="body1"
        dangerouslySetInnerHTML={{ __html: explanation }}
      />

      <QuizzButton theme={theme} question={previousQuestion}>
        {t('Previous question')}
      </QuizzButton>

      <QuizzButton theme={theme} question={nextQuestion}>
        {t('Next question')}
      </QuizzButton>
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
