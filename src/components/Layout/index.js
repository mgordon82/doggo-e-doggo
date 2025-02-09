import { Box, Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import Header from './Header';

const Layout = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        bgcolor: 'common.white',
      }}
    >
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Container maxWidth='xl' sx={{ py: 3 }}>
          <Outlet />
        </Container>
      </Box>
    </Container>
  );
};

export default Layout;
