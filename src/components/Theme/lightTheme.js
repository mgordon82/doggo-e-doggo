import { createTheme } from '@mui/material/styles';

const error = '#cf1c24';
const warning = '#f4bb00';
const success = '#007f4b';
const white = '#ffffff';
const black = '#000000';

const lightTheme = {
  palette: {
    type: 'light',
    background: {
      default: '#ffffff',
      disabled: '#dedede',
    },

    common: {
      black,
      white,
      offWhite: '#f5f6f7',
    },

    error: {
      main: error,
    },

    layout: {
      header: {
        background: '#e0e3e5',
      },
    },

    success: {
      main: success,
    },
    warning: {
      main: warning,
    },
    information: {
      main: '#045eda',
    },

    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1300,
        xl: 1536,
      },
    },
  },
};

export default createTheme(lightTheme);
