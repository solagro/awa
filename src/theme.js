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
    text: { primary: '#212121' },
  },
  typography: {
    h1: {
      color: '#8a2542',
      fontSize: 48,
      fontFamily: 'abel, roboto, helvetica, arial, sans-serif',
    },
    h2: {
      color: '#8a2542',
      fontSize: 32,
      fontFamily: 'roboto, helvetica, arial, sans-serif',
    },
    h3: {
      fontSize: 18,
      fontWeight: 500,
      fontFamily: 'roboto, helvetica, arial, sans-serif',
    },
    subtitle1: {
      color: '#757575',
      fontSize: 18,
      fontFamily: 'roboto, helvetica, arial, sans-serif',
      fontWeight: 500,
      lineHeight: 1.5,
      textAlign: 'center',
    },
    body2: {
      color: '#757575',
    },
    body1: {
      color: '#212121',
    },
    fontSize: 14,
    lineHeight: 1,
    fontFamily: 'roboto, helvetica, arial, sans-serif',
  },
  overrides: {
    MuiSvgIcon: {
      root: {
        width: '1.5em',
        height: '1.5em',
      },
    },
    MuiAppBar: {
      colorPrimary: {
        marginBottom: 48,
      },
    },
    MuiTabs: {
      flexContainer: {
        justifyContent: 'space-around',
        marginBottom: 24,
        marginTop: 24,
      },
      indicator: {
        height: 8,
        width: 8,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
      },
    },
    MuiFab: {
      root: {
        '&:hover': {
          backgroundColor: 'rgba(138,37,66,0.30)',
        },
      },
    },
  },
});

export default theme;
