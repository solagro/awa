import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import QuizzButton from './QuizzButton';
import SEO from './Seo';
import Layout from './Layout';

import doRedirect from '../hoc/doRedirect';
import { GlobalDispatchContext, GlobalStateContext } from './GlobalContextProvider';

const capitalize = text => text[0].toUpperCase() + text.slice(1);

const parseQuestions = rawAnswers => rawAnswers.split('\n').map(rawAnswer => {
  const firstSpaceIndex = rawAnswer.indexOf(' ');

  const valid = rawAnswer.substr(0, firstSpaceIndex) === 'V';
  const text = rawAnswer.substr(firstSpaceIndex + 1);
  return { valid, text };
});

const QuizzQuestion = ({
  pageContext: { id, theme },
  data: {
    questionSeries: { questions = [] } = {},
    question: {
      answers: answersEn,
      answer_i18n: answersI18n,
      fields,
    },
  },
}) => {
  const { t, i18n } = useTranslation();

  const dispatch = React.useContext(GlobalDispatchContext);
  const { answers: { [theme]: givenAnswers } } = React.useContext(GlobalStateContext);

  const isAnswered = !!givenAnswers && (typeof givenAnswers[id] !== 'undefined');

  const currentIndex = questions.findIndex(({ id: currId }) => (currId === id));
  const previousQuestion = questions[currentIndex - 1];
  const nextQuestion = questions[currentIndex + 1];

  const allAnswers = [
    { language: 'en', answers: answersEn },
    ...answersI18n,
  ].reduce((acc, curr) => ({ ...acc, [curr.language]: curr.answers }), {});

  const allTexts = ['en', 'fr', 'es', 'et', 'de'].reduce((acc, lang) => {
    return fields[`markdownQuestion${capitalize(lang)}`]
      ? {
        ...acc,
        [lang]: {
          question: fields[`markdownQuestion${capitalize(lang)}`].childMarkdownRemark.html,
          explanation: fields[`markdownExplanation${capitalize(lang)}`].childMarkdownRemark.html,
          answers: allAnswers[lang],
        },
      } : acc;
  }, {});

  const [question, rawAnswers, explanation] = ['question', 'answers', 'explanation']
    .map(textElement => (
      (allTexts[i18n.language] && allTexts[i18n.language][textElement])
        ? allTexts[i18n.language][textElement]
        : allTexts.en[textElement]
    ));

  const answers = parseQuestions(rawAnswers);

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
        <div key={text}>
          <Button
            variant="contained"
            onClick={() => dispatch({
              type: 'ANSWER',
              payload: { id, theme, index, valid },
            })}
            disabled={isAnswered}
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
