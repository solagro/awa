import React from 'react';
import { useTranslation } from 'react-i18next';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import SEO from './Seo';
import Layout from './Layout';
import Link from './Link';

import doRedirect from '../hoc/doRedirect';
import { GlobalDispatchContext, GlobalStateContext } from './GlobalContextProvider';
import Roadmap from './Roadmap';

const useStyles = makeStyles(theme => ({
  layout: {
    textAlign: 'center',
  },
  module: {
    textAlign: 'center',
  },
  results: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    minHeight: '15em',
  },
  category__title: {
    margin: theme.spacing(6),
  },
  category__subtitle_cat: {
    fontSize: '1.2rem',
    fontWeight: 500,
  },
  nav_buttons: {
    marginTop: theme.spacing(8),
  },
}));

const QuizQuestion = ({ pageContext: { theme } }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const dispatch = React.useContext(GlobalDispatchContext);

  const {
    answers: { [theme]: givenAnswers } = {},
  } = React.useContext(GlobalStateContext) || {};

  const answersCount = Object.values(givenAnswers || {})
    .filter(({ valid }) => valid)
    .reduce((store, { category }) => (store[category]
      ? { ...store, [category]: store[category] + 1 }
      : { ...store, [category]: 1 }), {});

  return (
    <Layout className={classes.layout}>
      <SEO title={t('Quiz')} lang={i18n.language} />

      <Typography variant="h1" gutterBottom>
        {t('Farm vulnerability and adaptation Quiz')}
      </Typography>

      <Typography className={classes.category__title} variant="h2" gutterBottom>
        {t('Results')}
      </Typography>

      <Typography variant="body1" component="ul" className={classes.results}>
        {Object.keys(answersCount).map(category => (
          <li key={category}>
            <span className={classes.category__subtitle_cat}>
              {category}{' - '}
            </span>

            <span className={classes.category__subtitle_score}>
              {answersCount[category]} {t('good answer', { count: answersCount[category] })}
            </span>
          </li>
        ))}
      </Typography>

      <Typography variant="h2" gutterBottom>
        {t('Agriadapt roadmap for adaptation')}
      </Typography>

      <Roadmap />

      <Grid
        className={classes.nav_buttons}
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Button
            variant="outlined"
            component={Link}
            to="/quiz"
            onClick={() => dispatch({ type: 'ANSWER_RESET' })}
          >
            {t('Try another quiz')}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/map"
            lang={i18n.language}
          >
            {t('Go to the map')}
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default doRedirect(QuizQuestion);
