import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { graphql } from 'gatsby';
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
import themesConfig from '../lib/themes';

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
    margin: 0,
  },
  atlantic: {
    maxWidth: '30%',
    order: 2,
    textAlign: 'right',
    alignSelf: 'center',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      textAlign: 'center',
    },
  },
  north: {
    minWidth: '100%',
    margin: 'auto',
    marginBottom: 0,
    order: 1,
    textAlign: 'center',
    alignSelf: 'center',
  },
  common: {
    maxWidth: 200,
    padding: 0,
    order: 3,
  },
  continental: {
    maxWidth: '30%',
    order: 4,
    textAlign: 'left',
    alignSelf: 'center',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      textAlign: 'center',
    },
  },
  meridional: {
    minWidth: '100%',
    margin: 'auto',
    marginTop: 0,
    order: 5,
    textAlign: 'center',
    alignSelf: 'center',
  },
}));

const QuizPage = ({ location: { pathname }, data }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  /**
   * Get first question of each theme
   */
  const firstQuestions = Object.entries(data)
    .reduce((acc, [theme, { questions: [{ fields: { slug } }] }]) =>
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
              key={theme}
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
                title={t(
                  '{{country}}. Available languages: English standard or {{language}} by changing the language of the site',
                  {
                    country: t(themesConfig[theme].mainCountry),
                    language: t(themesConfig[theme].mainLanguage),
                  },
                )}
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

export const query = graphql`
  query {
    atlantic: allQuizJson(filter: {theme: {eq: "atlantic"}}, sort: {fields: order}, limit: 1) {
      questions: nodes {
        fields {
          slug
        }
      }
    }
    continental: allQuizJson(filter: {theme: {eq: "continental"}}, sort: {fields: order}, limit: 1) {
      questions: nodes {
        fields {
          slug
        }
      }
    }
    north: allQuizJson(filter: {theme: {eq: "north"}}, sort: {fields: order}, limit: 1) {
      questions: nodes {
        fields {
          slug
        }
      }
    }
    meridional: allQuizJson(filter: {theme: {eq: "meridional"}}, sort: {fields: order}, limit: 1) {
      questions: nodes {
        fields {
          slug
        }
      }
    }
  }
`;


export default doRedirect(QuizPage);
