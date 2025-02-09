import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';

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
      <Box sx={{ display: 'flex' }}>
        <Box>
          <Typography>This is the Layout</Typography>
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};

export default Layout;
