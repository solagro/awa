import React from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Done from '@material-ui/icons/Done';
import Clear from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';

import QuizButton from './QuizButton';
import SEO from './Seo';
import Layout from './Layout';
import Link from './Link';

import doRedirect from '../hoc/doRedirect';
import { GlobalDispatchContext, GlobalStateContext } from './GlobalContextProvider';
import { processQuizTexts } from '../lib/quizHelpers';

const useStyles = makeStyles(theme => ({
  module: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: theme.spacing(10),
  },
  module__title: {
    display: 'flex',
    textAlign: 'center',
  },
  category__title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  answer: {
    margin: '.1em auto',
    minWidth: 400,
    borderRadius: '7px',
    border: '4px solid transparent',
  },
  valid: {
    border: '4px solid #fafafa',
    backgroundColor: '#a5d6a7',
  },
  invalid: {
    border: '4px solid #fafafa',
    backgroundColor: '#ef9a9a',
  },
  validUserChoice: {
    border: '4px solid #4caf50',
    borderRadius: '7px',
    backgroundColor: '#a5d6a7',
  },
  invalidUserChoice: {
    border: '4px solid #f44336',
    borderRadius: '7px',
    backgroundColor: '#ef9a9a',
  },
  answer__button: {
    textTransform: 'capitalize',
  },
  answer__type: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  answer__type__icon: {
    marginRight: theme.spacing(1),
  },
  answer__type__icon_correct: {
    color: '#a5d6a7',
  },
  answer__type__icon_wrong: {
    color: '#ef9a9a',
  },
  card: {
    backgroundColor: '#acd9e933',
  },
  card__actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progress: {
    // display: 'flex',
    display: 'none',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  progress__bullet: {
    width: 16,
    height: 16,
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#e0e0e0',
    margin: '0 8px',
  },
  progress__bullet_answered_valid: {
    backgroundColor: '#a5d6a7',
  },
  progress__bullet_answered_invalid: {
    backgroundColor: '#ef9a9a',
  },
  quiz__nav_buttons: {
    marginTop: theme.spacing(4),
  },
}));

const QuizQuestion = ({
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
  const isGivenAnsweredValid = givenAnswers && givenAnswers[id] && givenAnswers[id].valid;

  const currentIndex = questions.findIndex(({ id: currId }) => (currId === id));
  const previousQuestion = questions[currentIndex - 1];
  const nextQuestion = questions[currentIndex + 1];

  const { category } = rawQuestion;
  const { question, answers, explanation } = processQuizTexts(rawQuestion, i18n);

  return (
    <Layout>
      <SEO title={t('Quiz')} lang={i18n.language} />
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.module}
        spacing={2}
      >

        <Typography className={classes.module__title} variant="h1" gutterBottom>
          {t('Farm vulnerability and adaptation Quiz')}
        </Typography>

        <Typography className={classes.category__title} variant="h2" gutterBottom>
          {category ? t(category) : t('Question')}
        </Typography>

        <Typography
          variant="subtitle1"
          dangerouslySetInnerHTML={{ __html: question }}
        />

        <Grid
          item
          className={classes.answers__group}
          xs={12}
          md={9}
          xl={8}
        >
          {answers.map(({ text, valid }, index) => (
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
              key={text}
              className={clsx({
                [classes.answer]: true,
                [classes.valid]: isAnswered && valid,
                [classes.invalid]: isAnswered && !valid,
                [classes.validUserChoice]: givenAnswer === index && valid,
                [classes.invalidUserChoice]: givenAnswer === index && !valid,
              })}
            >
              <Button
                className={classes.answer__button}
                variant="outlined"
                onClick={() => dispatch({
                  type: 'ANSWER',
                  payload: { id, theme, index, valid },
                })}
              >
                {text}
              </Button>
            </Grid>
          ))}
        </Grid>
        {isAnswered && (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item className={classes.answer__type}>
            {isGivenAnsweredValid ? (
              <Done
                fontSize="large"
                className={clsx({
                  [classes.answer__type__icon]: true,
                  [classes.answer__type__icon_correct]: isGivenAnsweredValid,
                })}
              />
            ) : (
              <Clear
                fontSize="large"
                className={clsx({
                  [classes.answer__type__icon]: true,
                  [classes.answer__type__icon_wrong]: !isGivenAnsweredValid,
                })}
              />
            )}
            <Typography variant="h1" color="textPrimary">
              {isGivenAnsweredValid ? t('Correct !') : t('Wrong')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={9} xl={8}>
            <Card className={classes.card} elevation={6}>
              <CardContent>
                <Typography variant="h3" component="h2">
                  {t('Explanation')}
                </Typography>

                <Typography
                  variant="body2"
                  dangerouslySetInnerHTML={{ __html: explanation }}
                />
              </CardContent>
              <CardActions className={classes.card__actions}>
                <Button size="small">{t('Learn More')}</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        )}
        <Grid
          container
          className={classes.quiz__nav_buttons}
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <div className={classes.progress}>
            {questions.map(({ id: qId, fields: { slug } }) => (
              <span key={qId}>
                <Link to={`/quiz/${theme}/${slug}`}>
                  <div className={clsx({
                    [classes.progress__bullet]: true,
                    [classes.progress__bullet_answered]: isAnswered && qId === id,
                    [classes.progress__bullet_answered_valid]:
                      isAnswered && qId === id && isGivenAnsweredValid,
                    [classes.progress__bullet_answered_invalid]:
                      isAnswered && qId === id && !isGivenAnsweredValid,
                  })}
                  />
                </Link>
              </span>
            ))}
          </div>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            {previousQuestion && (
            <Grid item>
              <QuizButton
                theme={theme}
                question={previousQuestion}
                variant="outlined"
              >
                {t('Previous question')}
              </QuizButton>
            </Grid>
            )}
            {nextQuestion && (
            <Grid item>
              <QuizButton
                theme={theme}
                question={nextQuestion}
                variant="contained"
                color="secondary"
              >
                {t('Next question')}
              </QuizButton>
            </Grid>
            )}

            {!nextQuestion && (
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to={`/quiz/${theme}/end`}
                >
                  {t('View result')}
                </Button>
              </Grid>
            )}

          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export const query = graphql`
  query ($theme: String, $id: String) {
    questionSeries: allQuizJson(
      filter: {theme: {eq: $theme}},
      sort: {fields: order, order: ASC}
    ) {
      questions: nodes {
        title
        id
        fields { slug }
      }
    }

    question: quizJson(id: {eq: $id}) {
      category

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

export default doRedirect(QuizQuestion);
