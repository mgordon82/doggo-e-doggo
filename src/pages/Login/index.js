import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Button,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { loginRequest } from '../../containers/Authentication/authSlice';
import { useNavigate } from 'react-router';
import logo from '../../assets/doggo-e-doggo.jpg';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const [session, setSession] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const onSubmit = () => {
    console.log('name email', { name, email });
    dispatch(
      loginRequest({
        name,
        email
      })
    );
  };
  React.useEffect(() => {
    const local = JSON.parse(sessionStorage.getItem('access-token'));
    setSession(local);
  }, [session]);

  React.useEffect(() => {
    if (isAuthenticated || session) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, session]);

  return (
    <Stack
      sx={{
        direction: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 1,
        height: '100vh'
      }}
    >
      <Avatar
        alt='doggo-e-doggo logo'
        src={logo}
        sx={{ height: 300, width: 300, my: 3 }}
      />
      <Paper sx={{ p: 5, width: 900 }}>
        <Typography variant='h4' component='h1' my={2} p={0}>
          Doggo-E-Doggo
        </Typography>
        {error && <Typography>{error}</Typography>}
        <Typography>Enter your login details below:</Typography>
        <Stack gap={3} my={2}>
          <TextField
            label='Enter Name'
            size='small'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label='Enter Email'
            size='small'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Stack>
        <Button variant='contained' onClick={onSubmit}>
          Login
        </Button>
      </Paper>
    </Stack>
  );
};

export default Login;
