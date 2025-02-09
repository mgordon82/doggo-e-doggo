import { Button, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../containers/Authentication/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Typography>This is the dashboard</Typography>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default Dashboard;
