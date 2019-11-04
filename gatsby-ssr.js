/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
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
