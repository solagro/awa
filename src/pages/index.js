import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import SEO from '../components/Seo';
import Layout from '../components/Layout';
import Link from '../components/Link';

import doRedirect from '../hoc/doRedirect';

const IndexPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <SEO title={t('Home')} lang={i18n.language} />

      <Typography variant="h1">
        {t('Main title of home page')}
      </Typography>

      {/* Project block */}

      <Typography variant="h2" gutterBottom>{t('Project block')}</Typography>

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

      <Typography variant="body1" paragraph>
        Vitae amet quod beatae est molestiae ex et. Enim ipsum placeat
        reiciendis itaque quis magnam perferendis qui. Labore aut et quibusdam
        enim.
      </Typography>

      <Divider />

      {/* Quizz block */}

      <Typography variant="h2" gutterBottom>{t('Quizz block')}</Typography>

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

      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/quizz"
        lang={i18n.language}
      >
        {t('Start quizz')}
      </Button>

      <Divider />

      {/* Map block */}

      <Typography variant="h2" gutterBottom>{t('Map block')}</Typography>

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

      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/quizz"
        lang={i18n.language}
      >
        {t('Go to the map')}
      </Button>

      <Divider />

      {/* Adaptations block */}

      <Typography variant="h2" gutterBottom>{t('Adaptations block')}</Typography>

      <Typography variant="body1" paragraph>
        Nemo qui nesciunt voluptas unde. Distinctio velit voluptatibus. Sunt
        sint qui dolorem in. Fugiat in qui qui blanditiis inventore. Eum nihil
        alias quo. Dolor reiciendis ea modi incidunt.
      </Typography>

      <Typography variant="body1" paragraph>
        Officiis est ratione sequi sunt. Id et expedita quas. Dolorem unde eos
        quis. Eaque omnis voluptas esse non. Rem laborum odit omnis perspiciatis
        nobis officiis est quibusdam. Corporis dolores maiores quae ullam
        voluptas nihil et consequuntur voluptas.
      </Typography>

      <Typography variant="body1" paragraph>
        Omnis excepturi ea. Dolor debitis rerum rerum fuga et ut autem ut
        voluptatum. Esse vel est debitis. Natus assumenda laborum tempore et
        inventore. Doloribus expedita reprehenderit.
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/quizz"
        lang={i18n.language}
      >
        {t('See mesures')}
      </Button>

      <Divider />

      {/* Summary')}</ */}

      <Typography variant="h2" gutterBottom>{t('Summary')}</Typography>

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

      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/quizz"
        lang={i18n.language}
      >
        {t('Start quizz')}
      </Button>
    </Layout>
  );
};

export default doRedirect(IndexPage);
