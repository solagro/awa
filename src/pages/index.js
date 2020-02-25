import React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Layout from '../components/Layout';
import Link from '../components/Link';
import Roadmap from '../components/Roadmap';
import SEO from '../components/Seo';

import doRedirect from '../hoc/doRedirect';
import MarkdownText from '../components/MarkdownText';

const useStyles = makeStyles(theme => ({
  module: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(10),
    // minHeight: '100vh', // waiting more realistic content
  },
  module__content__title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: theme.spacing(7),
  },
  module__content__title_picto: {
    width: 64,
    marginRight: theme.spacing(2),
  },
  module__content__button: {
    paddingTop: theme.spacing(7),
  },
  module__innernav: {
    display: 'flex',
    justifyContent: 'center',
    opacity: 0,
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '&:hover': {
      opacity: 1,
    },
  },
  module__innernav__button: {
    backgroundColor: '#ACD9E9',
    boxShadow: 'none',

  },
  module__innernav__top_button: {
    backgroundColor: '#fff',
    opacity: '.65',
  },
}));

const IndexPage = ({
  data: { allFile: { nodes = [] } = {} } = {},
}) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const customMarkdownComponents = {
    p: props => <Typography variant="body1" paragraph {...props} />,
    roadmap: props => (
      <div {...props}>
        <Roadmap />
      </div>
    ),
  };

  nodes.sort((
    { childMarkdownRemark: { frontmatter: { order: a } } },
    { childMarkdownRemark: { frontmatter: { order: b } } },
  ) => (a - b));

  return (
    <Layout header footer paper={false}>
      <SEO title={t('Home')} lang={i18n.language} />
      {nodes.map(({
        childMarkdownRemark: {
          htmlAst,
          frontmatter: {
            id,
            title,
            picto,
            altPicto,
            hrefBefore,
            hrefAfter,
            to,
            buttonText,
          },
        },
      }) => (
        <Grid
          container
          alignItems="center"
          alignContent="center"
          className={classes.module}
          id={id}
          key={id}
          component="section"
        >
          {hrefBefore && (
          <Box
            className={clsx({
              [classes.module__innernav]: true,
              [classes.module__innernav_before]: hrefBefore,
            })}
          >
            <IconButton
              className={classes.module__innernav__button}
              aria-label="navigation"
              href={hrefBefore}
              component="a"
              size="small"
            >
              <ArrowDropUpIcon style={{ color: '#fff' }} fontSize="small" />
            </IconButton>
          </Box>
          )}
          <Grid container justify="center" className={classes.module__content}>
            <Box className={classes.module__content__title}>
              {picto && (
              <img
                className={classes.module__content__title_picto}
                src={picto}
                alt={altPicto}
              />
              )}
              { /* i18next-extract-disable-next-line */}
              <Typography variant="h1" gutterBottom>{t(title)}</Typography>
            </Box>
            <Grid container className={classes.module__content__text} justify="flex-start">
              <MarkdownText hast={htmlAst} components={customMarkdownComponents} />
            </Grid>
            {to && (
            <Grid container className={classes.module__content__button} justify="center">
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to={to}
                lang={i18n.language}
              >
                { /* i18next-extract-disable-next-line */}
                {t(buttonText)}
              </Button>
            </Grid>
            )}
          </Grid>
          {hrefAfter && (
          <Box
            className={clsx({
              [classes.module__innernav]: true,
              [classes.module__innernav_before]: hrefBefore,
            })}
          >
            <IconButton
              className={classes.module__innernav__button}
              aria-label="navigation"
              href={hrefAfter}
              component="a"
              size="small"
            >
              <ArrowDropDownIcon style={{ color: '#fff' }} fontSize="small" />
            </IconButton>
          </Box>
          )}
        </Grid>
      ))}
      <Grid container className={classes.module__innernav__top} justify="flex-end">
        <Fab
          className={classes.module__innernav__top_button}
          aria-label="navigation"
          href="#project"
          component="a"
          size="medium"
        >
          <ArrowUpwardIcon color="secondary" />
        </Fab>
      </Grid>
    </Layout>
  );
};

export default doRedirect(IndexPage);

export const query = graphql`
  query ($language: String = "en") {
    allFile(
      filter: {
        sourceInstanceName: { eq: "home" },
        childMarkdownRemark: { frontmatter: { locale: { eq: $language } } }
      }
      sort: {
        fields: [childMarkdownRemark___frontmatter___order, relativePath]
      }
    ) {
      nodes {
        childMarkdownRemark {
          htmlAst
          frontmatter { altPicto buttonText id title picto hrefAfter hrefBefore to order }
        }
      }
    }
  }
`;
