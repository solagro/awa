import { createMuiTheme } from '@material-ui/core';

/**
 * https://material-ui.com/customization/default-theme/
 *
 * https://material-ui.com/customization/globals/
 * https://material-ui.com/customization/palette/
 * https://material-ui.com/customization/typography/
 *
 * https://material-ui.com/customization/color/
 */
const theme = createMuiTheme({
  palette: {
    primary: { main: '#8a2542' },
    secondary: {
      main: '#dca817',
      contrastText: 'white',
    },
  },
  typography: {
    h1: {
      color: '#8a2542',
      fontSize: 48,
      fontFamily: 'abel, roboto, helvetica, arial, sans-serif',
    },
    h2: {
      color: '#8a2542',
      fontSize: 36,
      lineHeight: 4,
      fontFamily: 'roboto, helvetica, arial, sans-serif',
    },
    h3: {
      color: '#8a2542',
      fontSize: 18,
      lineHeight: 4,
      fontFamily: 'roboto, helvetica, arial, sans-serif',
    },
    subtitle1: {
      color: '#757575',
      fontSize: '18px',
      fontFamily: 'roboto, helvetica, arial, sans-serif',
      fontWeight: 500,
      lineHeight: 1.5,
      textAlign: 'center',
    },
    fontSize: 14,
    lineHeight: 1,
    fontFamily: 'roboto, helvetica, arial, sans-serif',
  },
  overrides: {
  },
});

export default theme;
