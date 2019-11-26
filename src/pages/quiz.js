import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useStaticQuery, graphql } from 'gatsby';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

import SEO from '../components/Seo';
import Link from '../components/Link';
import Layout from '../components/Layout';
import doRedirect from '../hoc/doRedirect';


const useStyles = makeStyles(theme => ({
  module: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: theme.spacing(10),
  },
  module__title: {
    textAlign: 'center',
  },
  category__title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  themes__group: {
    marginTop: theme.spacing(4),
  },
  theme__button: {
    padding: '0px 48px',
  },
  theme__button_image: {
    maxHeight: 200,
  },
  atlantique: {
    minWidth: '50%',
    order: 2,
    textAlign: 'right',
    alignSelf: 'center',
  },
  nord: {
    minWidth: '100%',
    margin: 'auto',
    order: 1,
    textAlign: 'center',
    alignSelf: 'center',
  },
  common: {
    minWidth: '50%',
    order: 2,
    textAlign: 'left',
    alignSelf: 'center',
  },
}));

const QuizPage = ({ location: { pathname } }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const { results: { questions = [] } = {} } = useStaticQuery(graphql`
    {
      results: allQuizJson(sort: {fields: order}) {
        questions: nodes {
          theme
          fields {
            slug
          }
        }
      }
    }
  `);

  /**
   * Get first question of each theme
   */
  const firstQuestions = questions.reduce((acc, { theme, fields: { slug } }) =>
    (acc[theme] ? acc : { ...acc, [theme]: slug }), {});

  /**
   * Build array of themes
   */
  const themes = Object.keys(firstQuestions);

  return (
    <Layout>
      <SEO title={t('Quiz')} lang={i18n.language} />
      <Grid container justify="center" className={classes.module}>

        <Typography className={classes.module__title} variant="h1" gutterBottom>
          {t('Farm vulnerability and adaptation Quiz')}
        </Typography>

        <Typography className={classes.category__title} variant="h2" gutterBottom>
          {t('zone selection')}
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          <Trans>
        Please select the area in which you would like to test your knowledge
          </Trans>
        </Typography>
        <Grid
          container
          className={classes.themes__group}
          justify="center"
          wrap="wrap"
        >
          {themes.map(theme => (
            <Grid
              item
              className={clsx({
                [classes.theme__button]: true,
                [classes[theme]]: theme,
              })}
              xs={12}
              md={6}
              xl={4}
            >
              <Tooltip
                title={t(`${theme} region. Available languages: English standard or ${i18n.language} by changing the language of the site`)}
                placement="left-start"
              >
                <ButtonBase
                  key={theme}
                  component={Link}
                  to={`${pathname}/${theme}/${firstQuestions[theme]}`}
                >
                  <img className={classes.theme__button_image} src={`../../images/themes/${theme}.png`} alt={theme} />
                </ButtonBase>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default doRedirect(QuizPage);