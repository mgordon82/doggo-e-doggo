import { Typography } from '@mui/material';
import React from 'react';

const Dashboard = () => {
  return (
    <>
      <Typography component='h2' fontWeight='bold'>
        Welcome to Doggo-E-Doggo!
      </Typography>
      <Typography component='p'>
        We are here to help you find your next doggo. And once you find one,
        you'll find another and another and another. Come find your new best
        friends!
      </Typography>
      <Typography my={4} component='p'>
        Search for a doggo below
      </Typography>
    </>
  );
};

export default Dashboard;
