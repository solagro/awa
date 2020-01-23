import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import Link from '../components/Link';
import SEO from '../components/Seo';
import Layout from '../components/Layout';
import CSVGenerator from '../components/CSVGenerator';
import doRedirect from '../hoc/doRedirect';

const templateLink = 'gridcode.xlsx';
const githubUploadLink = 'https://github.com/solagro/awa/upload/master/content/map';

const HelpPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <SEO title={t('Help')} lang={i18n.language} />

      <Typography variant="h1" gutterBottom>
        {t('Help')}
      </Typography>

      <Typography variant="h2" gutterBottom>
        {t('Tips & tools for using site website.')}
      </Typography>

      <Typography variant="body1" gutterBottom>
        <Trans>
          Introduction or description of help page
        </Trans>
      </Typography>

      <Typography variant="h3" gutterBottom>
        {t('Map data')}
      </Typography>

      <Typography variant="body1" gutterBottom>
        <Trans>
          Data for <Link to="/map">Observations</Link> have to be contributed
          through a CSV files:
        </Trans>
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CSVGenerator />
        </Grid>
        <Grid item xs={6}>
          <Trans>
            <List dense>
              <ListItem>
                <ListItemText>
                  Create and rename a copy of <a href={templateLink}><tt>gridcode.xlsx</tt></a>{' '}
                  for each grid point to create/update. <em>(i.e. 12345.xlsx, 43215.xlsx,…)</em>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  Contribute data for each spreadsheet of the workbook.{' '}
                  <em>Warning: Do not rename spreadsheets (tabs).</em>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  Use the widget below cons to generate a zip file containing
                  CSV file for each spreadsheet tab, grouped by directories
                  named after orignal files.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  Download and extract generated zip file on local computer.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText>
                  Use <a href={githubUploadLink}>Github interface to upload</a>{' '}
                  every gridpoint directories at once.
                </ListItemText>
              </ListItem>
            </List>
          </Trans>
        </Grid>
      </Grid>

      <pre>legal menu</pre>
    </Layout>
  );
};

export default doRedirect(HelpPage);
