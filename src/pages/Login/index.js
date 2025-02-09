import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import { loginRequest } from '../../containers/Authentication/authSlice';
import { useNavigate } from 'react-router';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  );

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const onSubmit = () => {
    console.log('name email', { name, email });
    dispatch(
      loginRequest({
        name,
        email,
      })
    );
  };

  React.useEffect(() => {
    const storageAccess = JSON.parse(sessionStorage.getItem('access-token'));
    if (isAuthenticated || storageAccess) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', margin: '30px auto' }}
    >
      <Paper sx={{ p: 5 }}>
        {error && <Typography>{error}</Typography>}
        <Typography>Enter your login details below:</Typography>
        <TextField
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={onSubmit}>Login</Button>
      </Paper>
    </Container>
  );
};

export default Login;
