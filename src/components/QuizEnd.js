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
    margin: '.5em auto',
    minWidth: 400,
    borderRadius: '5px',
  },
  valid: {
    border: 'none',
    backgroundColor: '#a5d6a7',
  },
  invalid: {
    border: 'none',
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
    position: 'fixed',
    bottom: theme.spacing(4),
  },
}));

const QuizQuestion = ({ pageContext: { theme } }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const dispatch = React.useContext(GlobalDispatchContext);
  const {
    answers: { [theme]: givenAnswers } = {},
  } = React.useContext(GlobalStateContext) || {};

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
          {t('Results')}
        </Typography>


        <pre>
          {JSON.stringify(givenAnswers, null, 2)}
        </pre>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/quiz"
        >
          {t('Try another quiz')}
        </Button>
      </Grid>
    </Layout>
  );
};

export default doRedirect(QuizQuestion);
