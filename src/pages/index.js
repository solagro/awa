import React from 'react';

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

const contentPage = [
  {
    id: 'projectPresentation',
    title: 'Project',
    hrefAfter: '#quizPresentation',
    content: (
      <>
        <Typography variant="body1" paragraph>
          Laudantium dolores voluptatum debitis tempora molestiae praesentium
          omnis nihil modi. Consequuntur qui laboriosam nostrum ratione voluptatum
          enim ut esse sit. Iste corporis non cupiditate est itaque laudantium
          recusandae sapiente. Harum sequi voluptatem deserunt distinctio modi
          ratione. Et accusantium voluptatem architecto.
        </Typography>

        <Typography variant="body1" paragraph>
          Culpa fugiat nobis ut. Laborum velit est id cupiditate maxime aut.
          Incidunt illo provident sed.
        </Typography>
      </>
    ),
  }, {
    id: 'quizPresentation',
    title: 'Farm vulnerability and adaptation Quiz',
    picto: '/images/pictos/quiz.svg',
    altPicto: 'quiz',
    hrefBefore: '#top',
    hrefAfter: '#mapPresentation',
    to: '/quiz',
    buttonText: 'Start quiz',
    content: (
      <>
        <Typography variant="body1" paragraph>
          Et et corrupti nihil saepe voluptas cumque nihil. Aut nesciunt minima.
          Minima modi unde sunt deleniti laborum.
        </Typography>

        <Typography variant="body1" paragraph>
          Sunt eius autem optio itaque. Facilis consequatur inventore eligendi
          voluptates. Magnam est enim eos voluptas error dolore ut facere.
        </Typography>

        <Typography variant="body1" paragraph>
          Occaecati quia culpa. Ad eum ut voluptate pariatur error odio quae. Eos
          doloremque et qui. Ab voluptas labore maiores non pariatur voluptas fuga
          ea nihil. Adipisci nesciunt tempore quisquam aut qui sint. Iure facilis
          tenetur quis eius molestiae hic laudantium itaque.
        </Typography>
      </>
    ),
  }, {
    id: 'mapPresentation',
    title: 'Yield & Climate (observations and projections)',
    picto: '/images/pictos/observations.svg',
    altPicto: 'observations',
    hrefBefore: '#quizPresentation',
    hrefAfter: '#adaptationsPresentation',
    to: '/map',
    buttonText: 'Go to the map',
    content: (
      <>
        <Typography variant="body1" paragraph>
          Aut at non veniam quia eum id soluta sit impedit. Ratione optio vel.
          Consequatur placeat non earum alias et officiis. Iusto est adipisci quis
          consequatur omnis incidunt. Laborum ut ipsam deserunt maiores numquam
          esse amet id. Exercitationem ut consequatur.
        </Typography>

        <Typography variant="body1" paragraph>
          Distinctio molestiae est eligendi dignissimos iste sed consequatur. Sit
          sed ullam non facere. Et et expedita ipsam est voluptatem est. Aperiam
          ipsum earum qui quasi dicta expedita iure quo non. Quibusdam ullam rem
          eum aut qui. Corrupti doloremque ut officiis error.
        </Typography>

        <Typography variant="body1" paragraph>
          Labore est omnis illum dolor praesentium aut tempora libero.
          Consequuntur et deleniti. A numquam dolor pariatur iure occaecati quia
          hic ab quasi. Quae corrupti corporis et. Et voluptas dolores ut
          dignissimos cupiditate quas accusamus neque. Velit consectetur voluptas
          magni nostrum quis autem sapiente quia sequi.
        </Typography>

        <Typography variant="body1" paragraph>
          Aut at non veniam quia eum id soluta sit impedit. Ratione optio vel.
          Consequatur placeat non earum alias et officiis. Iusto est adipisci quis
          consequatur omnis incidunt. Laborum ut ipsam deserunt maiores numquam
          esse amet id. Exercitationem ut consequatur.
        </Typography>

        <Typography variant="body1" paragraph>
          Distinctio molestiae est eligendi dignissimos iste sed consequatur. Sit
          sed ullam non facere. Et et expedita ipsam est voluptatem est. Aperiam
          ipsum earum qui quasi dicta expedita iure quo non. Quibusdam ullam rem
          eum aut qui. Corrupti doloremque ut officiis error.
        </Typography>

        <Typography variant="body1" paragraph>
          Labore est omnis illum dolor praesentium aut tempora libero.
          Consequuntur et deleniti. A numquam dolor pariatur iure occaecati quia
          hic ab quasi. Quae corrupti corporis et. Et voluptas dolores ut
          dignissimos cupiditate quas accusamus neque. Velit consectetur voluptas
          magni nostrum quis autem sapiente quia sequi.
        </Typography>

        <Typography variant="body1" paragraph>
          Aut at non veniam quia eum id soluta sit impedit. Ratione optio vel.
          Consequatur placeat non earum alias et officiis. Iusto est adipisci quis
          consequatur omnis incidunt. Laborum ut ipsam deserunt maiores numquam
          esse amet id. Exercitationem ut consequatur.
        </Typography>

        <Typography variant="body1" paragraph>
          Distinctio molestiae est eligendi dignissimos iste sed consequatur. Sit
          sed ullam non facere. Et et expedita ipsam est voluptatem est. Aperiam
          ipsum earum qui quasi dicta expedita iure quo non. Quibusdam ullam rem
          eum aut qui. Corrupti doloremque ut officiis error.
        </Typography>
      </>
    ),
  }, {
    id: 'adaptationsPresentation',
    title: 'Sustainable adaptation measures',
    picto: '/images/pictos/adaptations.svg',
    altPicto: 'adaptations',
    hrefBefore: '#mapPresentation',
    hrefAfter: '#summaryPresentation',
    to: '/adaptations',
    buttonText: 'See measures',
    content: (
      <>
        <Typography variant="body1" paragraph>
          Aut at non veniam quia eum id soluta sit impedit. Ratione optio vel.
          Consequatur placeat non earum alias et officiis. Iusto est adipisci quis
          consequatur omnis incidunt. Laborum ut ipsam deserunt maiores numquam
          esse amet id. Exercitationem ut consequatur.
        </Typography>

        <Typography variant="body1" paragraph>
          Distinctio molestiae est eligendi dignissimos iste sed consequatur. Sit
          sed ullam non facere. Et et expedita ipsam est voluptatem est. Aperiam
          ipsum earum qui quasi dicta expedita iure quo non. Quibusdam ullam rem
          eum aut qui. Corrupti doloremque ut officiis error.
        </Typography>

        <Typography variant="body1" paragraph>
          Labore est omnis illum dolor praesentium aut tempora libero.
          Consequuntur et deleniti. A numquam dolor pariatur iure occaecati quia
          hic ab quasi. Quae corrupti corporis et. Et voluptas dolores ut
          dignissimos cupiditate quas accusamus neque. Velit consectetur voluptas
          magni nostrum quis autem sapiente quia sequi.
        </Typography>
      </>
    ),
  },
  {
    id: 'summaryPresentation',
    title: 'Summary',
    hrefBefore: '#adaptationsPresentation',
    to: '/quiz',
    buttonText: 'Start quiz',
    content: (
      <>
        <Typography variant="body1" paragraph>
          Qui consequatur sit nesciunt omnis voluptatem consequatur error ut
          placeat. Rerum accusantium sed est at aut rerum. Totam rem accusamus
          consequatur assumenda quo voluptatem dolorem excepturi. Ut voluptas eos
          voluptas laboriosam iure laboriosam qui. Est sed libero quia ut magni
          vitae aut minus.
        </Typography>

        <Typography variant="body1" paragraph>
          Quod totam consequatur incidunt pariatur. Eum et sed quasi cumque
          tempore. Totam modi cupiditate pariatur aspernatur soluta qui. Minus
          quae vitae fugiat.
        </Typography>

        <Typography variant="body1" paragraph>
          Ut rerum sed a ipsam ut ut voluptates quibusdam voluptas. Consequuntur
          minus quis. Non placeat dolor aut eos a officiis sunt omnis.
        </Typography>
        <Typography variant="h2">Agriadapt roadmap for adaptation </Typography>
        <Grid container style={{ maxWidth: '75%', margin: '2em auto' }}>
          <Roadmap />
        </Grid>
      </>
    ),
  },
];

const IndexPage = () => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();

  return (
    <Layout header footer paper={false}>
      <SEO title={t('Home')} lang={i18n.language} />
      {contentPage.map(({
        id,
        title,
        picto,
        altPicto,
        hrefBefore,
        hrefAfter,
        to,
        buttonText,
        content,
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
              {content}
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
