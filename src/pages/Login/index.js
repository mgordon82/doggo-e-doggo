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
import { useNavigate } from 'react-router';
import { loginRequest } from '../../containers/Authentication/authSlice';
import logo from '../../assets/doggo-e-doggo.jpg';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const [session, setSession] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const onSubmit = () => {
    dispatch(
      loginRequest({
        name,
        email
      })
    );
  };

  React.useEffect(() => {
    try {
      const stored = sessionStorage.getItem('access-token');
      if (stored) {
        const parsed = JSON.parse(stored);
        setSession(parsed);
      }
    } catch (e) {
      console.error('Error reading session from storage', e);
    }
  }, []);

  React.useEffect(() => {
    if (isAuthenticated || session) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate, session]);

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 3, md: 6 }}
      alignItems='center'
      justifyContent='center'
      sx={{
        minHeight: '100vh',
        px: 2,
        py: 4,
        bgcolor: 'background.default'
      }}
    >
      <Avatar
        alt='doggo-e-doggo logo'
        src={logo}
        sx={{
          width: { xs: 160, sm: 200, md: 260, lg: 300 },
          height: { xs: 160, sm: 200, md: 260, lg: 300 },
          mb: { xs: 1, md: 0 }
        }}
      />

      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 4, md: 5 },
          width: '100%',
          maxWidth: 480
        }}
      >
        <Typography
          variant='h4'
          component='h1'
          mb={1}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          Doggo-E-Doggo
        </Typography>

        {error && (
          <Typography
            variant='body2'
            color='error'
            mb={1}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            {error}
          </Typography>
        )}

        <Typography
          variant='body1'
          mb={2}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          Enter your login details below:
        </Typography>

        <Stack gap={2} mb={3}>
          <TextField
            label='Enter Name'
            size='small'
            name='name'
            value={name}
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label='Enter Email'
            size='small'
            name='email'
            value={email}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
        </Stack>

        <Stack
          direction='row'
          justifyContent={{ xs: 'center', md: 'flex-start' }}
        >
          <Button
            variant='contained'
            onClick={onSubmit}
            disabled={!name || !email}
          >
            Login
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Login;
