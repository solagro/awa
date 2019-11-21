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
    },
    h2: {
      color: '#8a2542',
      fontSize: 18,
      lineHeight: 32,
    },
    h3: { color: '#8a2542' },
    fontSize: 14,
    lineHeight: 27,
  },
  overrides: {
  },
});

export default theme;
