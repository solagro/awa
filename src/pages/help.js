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
import Divider from '@material-ui/core/Divider';

const templateLinks = {
  ods: '/gridcode.ods',
  xlsx: '/gridcode.xlsx',
};
const githubUpload = {
  csv: 'https://github.com/solagro/awa/upload/master/content/map',
  geojson: 'https://github.com/solagro/awa/upload/master/static/data',
};

const HelpPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <SEO title={t('Help')} lang={i18n.language} />

      <Typography variant="h1" gutterBottom>
        {t('Help')}
      </Typography>

      <Typography variant="body1" gutterBottom>
        <Trans>
          Introduction or description of help page
        </Trans>
      </Typography>

      <Typography variant="h2" gutterBottom>
        {t('Update gridpoints on map')}
      </Typography>

      <Trans>
        <List dense>
          <ListItem>
            <ListItemText>
              Go to <a href="https://geojson.io">geojson.io</a>.{' '}
              <em>(deny recovering previous map)</em>
            </ListItemText>
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText>
              Use <strong>File</strong> item from <strong>Open</strong> menu.
              <br />
              Then select <samp>.kml</samp> or <samp>.kmz</samp> file from local
              computer.
            </ListItemText>
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText>
              Visually check on map everything is correct.
            </ListItemText>
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText>
              Use <strong>GeoJSON</strong> item from <strong>Save</strong> menu
              to save a local copy of generated <samp>map.geojson</samp> file.
            </ListItemText>
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText>
              Use <a href={githubUpload.geojson}>Github interface</a> to upload{' '}
              <samp>map.geojson</samp> into <samp>static/data</samp> directory.
            </ListItemText>
          </ListItem>
        </List>
      </Trans>

      <Typography variant="h3" gutterBottom>
        {t('KML/KMZ files structure')}
      </Typography>

      <Typography variant="body1" gutterBottom>
        <Trans>
          Each geometry inside <samp>.kml/.kmz</samp> file <strong>must</strong> have
          a <samp>Grid_Code</samp> property matching the ID number of corresponding
          gridpoint.
        </Trans>
      </Typography>

      <Divider style={{ margin: '2em 0' }} />

      <Typography variant="h2" gutterBottom>
        {t('Update data for gridpoints')}
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
                  Create and rename a copy of <a href={templateLinks.ods}><samp>gridcode.ods</samp></a>{' '}
                  or <a href={templateLinks.xlsx}><samp>gridcode.xlsx</samp></a> for
                  each grid point to create/update. <em>(i.e. 12345.ods, 43215.xlsx,…)</em>
                </ListItemText>
              </ListItem>
              <Divider variant="middle" component="li" />
              <ListItem>
                <ListItemText>
                  Contribute data for each spreadsheet of the workbook.{' '}
                  <em>Warning: Do not rename spreadsheets (tabs).</em>
                </ListItemText>
              </ListItem>
              <Divider variant="middle" component="li" />
              <ListItem>
                <ListItemText>
                  Use the widget below cons to generate a zip file containing
                  CSV file for each spreadsheet tab, grouped by directories
                  named after orignal files.
                </ListItemText>
              </ListItem>
              <Divider variant="middle" component="li" />
              <ListItem>
                <ListItemText>
                  Download and extract generated <samp>zip</samp> file on local
                  computer.
                </ListItemText>
              </ListItem>
              <Divider variant="middle" component="li" />
              <ListItem>
                <ListItemText>
                  Use <a href={githubUpload.csv}>Github interface</a> to upload{' '}
                  <strong>every gridpoint directories at once</strong> into{' '}
                  <samp>content/map</samp> directory.
                </ListItemText>
              </ListItem>
            </List>
          </Trans>
        </Grid>
      </Grid>

      <Typography variant="h3" gutterBottom>
        {t('CSV files structure')}
      </Typography>

      <Trans>
        <Typography variant="body1" gutterBottom>
          First row cells are used as header (technical) name. The content of
          these cells is processed through translation mechanism.
        </Typography>
        <Typography variant="body1" gutterBottom>
          For each <strong>data line</strong>, first column cells should be
          a <var>year</var> value.
        </Typography>
        <Typography variant="body1" gutterBottom>
          The first row with no content in first cell is used as comment for
          column headers.
        </Typography>
      </Trans>
    </Layout>
  );
};

export default doRedirect(HelpPage);
