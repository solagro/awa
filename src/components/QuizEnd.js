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
  module: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: theme.spacing(10),
    minHeight: '96vh',
  },
  module__title: {
    display: 'flex',
    textAlign: 'center',
  },
  category__title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(4),
  },
  category__block: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  category__subtitle: {
    margin: theme.spacing(2),
  },
  category__subtitle_cat: {
    display: 'inline',
    fontSize: '1.2rem',
  },
  nav_buttons: {
    marginTop: theme.spacing(8),
  },
}));

const groupByCategories = (answered, cat) => answered.reduce((acc, question) => {
  const cle = question[cat];
  if (!acc[cle]) {
    acc[cle] = [];
  }
  acc[cle].push(question);
  return acc;
}, {});

const QuizQuestion = ({ pageContext: { theme } }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const dispatch = React.useContext(GlobalDispatchContext);
  const {
    answers: { [theme]: givenAnswers } = {},
  } = React.useContext(GlobalStateContext) || {};
  const answersData = Object.values(givenAnswers || {});
  const categories = Object.entries(groupByCategories(answersData, 'category'));
  const hasValidAnswers = category =>
    category[1].filter(response => response.valid).length;
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
        <div className={classes.category__block}>
          <Typography className={classes.category__title} variant="h2" gutterBottom>
            {t('Results')}
          </Typography>
          {categories.map(category => (
            <Grid
              className={classes.category__subtitle}
              container
              justify="flex-start"
              alignItems="baseline"
              spacing={1}
            >
              <Grid item>
                <Typography className={classes.category__subtitle_cat} variant="h3">
                  {`${category[0]} - `}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.category__subtitle_score} variant="p">
                  {`${hasValidAnswers(category)} 
                  ${hasValidAnswers(category) > 1 ? t('good answers') : t('good answer')}`}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </div>

        <Typography variant="h2" gutterBottom>{t('Agriadapt roadmap for adaptation')}</Typography>
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
      </Grid>
    </Layout>
  );
};

export default doRedirect(QuizQuestion);
