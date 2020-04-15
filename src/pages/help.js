import React from 'react';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';

import Link from '../components/Link';
import Layout from '../components/Layout';
import CSVGenerator from '../components/CSVGenerator';
import AdaptationsCSV from '../components/AdaptationsCSV';
import Kml2Geojson from '../components/Kml2Geojson';
import TicksSimulator from '../components/TicksSimulator';
import doRedirect from '../hoc/doRedirect';

const templateLinks = {
  ods: '/gridcode.ods',
  xlsx: '/gridcode.xlsx',
};
const githubUpload = {
  mapCsv: 'https://github.com/solagro/awa/upload/master/content/map',
  measuresCsv: 'https://github.com/solagro/awa/upload/master/content/adaptations',
  geojson: 'https://github.com/solagro/awa/upload/master/static/data',
};

const TemplateButton = props => (
  <Button
    color="secondary"
    variant="contained"
    style={{ textTransform: 'none' }}
    size="small"
    endIcon={<GetAppIcon />}
    {...props}
  />
);

const HelpPage = () => (
  <Layout>
    <Typography variant="h1" gutterBottom>
      Help
    </Typography>

    <Typography variant="h2" gutterBottom>
      Update gridpoints on map
    </Typography>

    <Typography variant="body2" style={{ marginBottom: '1em' }}>
      Use the widget below to generate a geojson file.
    </Typography>

    <Kml2Geojson />

    <Typography variant="body2" style={{ marginBottom: '2em' }}>
      Then use <a href={githubUpload.geojson}>Github interface</a> to upload{' '}
      <samp>map.geojson</samp> into <samp>static/data</samp> directory.
    </Typography>

    <Card style={{ background: '#eee' }}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          KML files structure
        </Typography>

        <Typography variant="body2">
          Each geometry inside <samp>.kml</samp> file <strong>must</strong> have
          a <samp>Grid_Code</samp> property matching the ID of corresponding
          gridpoint. Every other property will be removed from generated
          <samp>geojson</samp> file.
        </Typography>
      </CardContent>
    </Card>

    <Divider style={{ margin: '2em 0' }} />

    <Typography variant="h2" gutterBottom>
      Update data for gridpoints
    </Typography>

    <Typography variant="body2" style={{ marginBottom: '1em' }}>
      Create and rename a copy of <strong>workbook template</strong>{' '}
      <em>(<samp>xlsx</samp> or <samp>ods</samp>)</em> for
      each grid point to create/update. <em>(i.e. 12345.ods, 43215.xlsx,…)</em>
    </Typography>

    <Typography variant="body2" style={{ marginBottom: '1em' }}>
      Workbook templates :<br />
      {' '}
      <TemplateButton href={templateLinks.ods}>gridcode.ods</TemplateButton>
      {' '}
      <TemplateButton href={templateLinks.xlsx}>gridcode.xlsx</TemplateButton>
    </Typography>

    <Typography variant="body2" style={{ marginBottom: '1em' }}>
      Contribute data for each spreadsheet of the workbook.{' '}
      <em>Warning: Do not rename spreadsheets (tabs).</em>
    </Typography>

    <Typography variant="body2" style={{ marginBottom: '1em' }}>
      Use the widget below to generate a zip file containing
      CSV file for each spreadsheet tab, grouped by directories
      named after orignal files.
    </Typography>

    <CSVGenerator />

    <Typography variant="body2" style={{ marginBottom: '1em' }}>
      Download and extract generated <samp>zip</samp> file on local
      computer.
    </Typography>


    <Typography variant="body2" style={{ marginBottom: '2em' }}>
      Use <a href={githubUpload.mapCsv}>Github interface</a> to upload{' '}
      <strong>every gridpoint directories at once</strong> into{' '}
      <samp>content/map</samp> directory.
    </Typography>

    <Card style={{ background: '#eee' }}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          CSV files structure
        </Typography>

        <Typography variant="body2" gutterBottom>
          First row cells are used as header (technical) name. The content of
          these cells is processed through translation mechanism.
        </Typography>

        <Typography variant="body2" gutterBottom>
          For each <strong>data line</strong>, first column cells should be
          a <var>year</var> value.
        </Typography>

        <Typography variant="body2">
          The first row with no content in first cell is used as comment for
          column headers.
        </Typography>

        <Typography variant="h3" gutterBottom style={{ marginTop: '1em' }}>
          Custom parameters
        </Typography>

        <Typography variant="body2" gutterBottom>
          You may also have lines that are not <strong>data lines</strong>.
          We define them as parameter lines.
        </Typography>

        <Typography variant="body2" gutterBottom>
          The first cell of each of these lines contain the name of the
          parameter. Each other column may contain it own value for each
          parameter.
        </Typography>

        <Typography variant="body2" gutterBottom>
          Current available parameter are <var>min</var>,{' '}
          <var>max</var>, <var>steps</var>, and <var>decimal</var>.
        </Typography>

        <Typography variant="body2" gutterBottom style={{ fontWeight: 'bold' }}>
          Fill value only if you <u>want to change</u> the behavior of current
          data column.
        </Typography>

        <Typography variant="h3" style={{ marginTop: '1em', marginBottom: '1em' }}>
          Custom parameters simulator
        </Typography>

        <TicksSimulator />
      </CardContent>
    </Card>

    <Divider style={{ margin: '2em 0' }} />

    <Typography variant="h2" gutterBottom>
      Update adaptation measures
    </Typography>

    <Typography variant="body2" style={{ marginBottom: '1em' }}>
      Data for <Link to="/adaptations">Adaptation measures</Link> have to be contributed
      through a CSV files:
    </Typography>

    <AdaptationsCSV />

    <Typography variant="body2" style={{ marginBottom: '2em' }}>
      Use <a href={githubUpload.measuresCsv}>Github interface</a> to upload{' '}
      <strong>csv files</strong> into{' '}
      <samp>content/adaptations</samp> directory.
    </Typography>

  </Layout>
);

export default doRedirect(HelpPage);
