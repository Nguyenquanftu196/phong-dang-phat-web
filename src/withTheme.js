import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { create } from 'jss';
import preset from 'jss-preset-default';
import { map } from 'lodash';

const jss = create(preset());
// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7f344b',
      main: '#1f8b48',
      dark: '#420115',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true,
    h1: {
      fontSize: 50,
      lineHeight: 1.15,
      color: '#5b666b',
    },
    h2: {
      fontSize: `24px !important`,
      lineHeight: 1.15,
      color: '#343b3e',
      position: 'relative',
      fontWeight: 400,
      marginBottom: 16,
      '&::before': {
        content: `''`,
        position: 'absolute',
        width: '40%',
        height: 3,
        background: '#a73351',
        bottom: -16
      }
    },
    h3: {
      fontSize: 20,
      lineHeight: 1.15,
      color: '#303238',
    },
    h6: {
      fontSize: 20,
      lineHeight: 1.15,
      color: '#303238',
      position: 'relative',
      fontWeight: 500,
      '&::before': {
        content: `''`,
        position: 'absolute',
        width: '40%',
        height: 3,
        background: '#a73351',
        bottom: -16
      }
    },
  },
  shadows: ['none'].concat(map(Array(25), () => `0 2px 14px 0 #e3e8fb`)),
  overrides: {
    MuiTab: {
      root: {
        minWidth: '100px !important',
        padding: 0
      }
    },
    MuiSvgIcon: {
      root: {
        fontSize: '1.5rem !important',
      }
    },
    MuiDialogActions: {
      root: {
        padding: '8px 32px 32px'
      }
    }
  }
});

function withTheme(Component) {
  function WithTheme(props) {
    const sheets = new SheetsRegistry();

    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (

      <JssProvider registry={sheets} jss={jss}>
        <MuiThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...props} />
        </MuiThemeProvider>
      </JssProvider>
    );
  }

  return WithTheme;
}

export default withTheme;