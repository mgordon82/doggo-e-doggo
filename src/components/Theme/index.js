import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/styled-engine';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';

import lightTheme from './lightTheme';

const loadTheme = (theme) => {
  return lightTheme;
};

const Theme = ({ children, theme }) => (
  <StyledEngineProvider injectFirst>
    <MuiThemeProvider theme={loadTheme(theme)}>
      <ThemeProvider theme={loadTheme(theme)}>
        <Fragment>
          <CssBaseline />
          {children}
        </Fragment>
      </ThemeProvider>
    </MuiThemeProvider>
  </StyledEngineProvider>
);

Theme.propTypes = {
  children: PropTypes.element,
  theme: PropTypes.string
};

export default Theme;
