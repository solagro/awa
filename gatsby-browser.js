/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import 'typeface-roboto';
import theme from './src/theme';

import GlobalContextProvider from './src/components/GlobalContextProvider';
import './src/i18n';

// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement = ({ element }) => (
  <GlobalContextProvider>
    <ThemeProvider theme={theme}>
      {element}
    </ThemeProvider>
  </GlobalContextProvider>
);
