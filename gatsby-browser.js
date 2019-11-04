/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

require('typeface-roboto');
require('./src/i18n');

const React = require('react');
const { ThemeProvider } = require('@material-ui/core/styles');

const theme = require('./src/theme').default;

exports.wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    {element}
  </ThemeProvider>
);
