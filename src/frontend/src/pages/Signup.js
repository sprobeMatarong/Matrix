import { useForm } from 'react-hook-form';
import { Alert, Container, Stack, Typography, Box, TextField, Button, Grid } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

function Signup() {
  const [registered, setRegistered] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const handleSignUp = async (data) => {
    return await api
      .post('/register', data)
      .then(() => {
        setRegistered(true);
        reset();
      })
      .catch((err) => {
        const { error } = err.response.data;
        Object.keys(error).map((prop) => {
          setError(prop, { message: error[prop][0] }, { shouldFocus: true });
        });
      });
  };

  const validationRules = {
    first_name: {
      required: {
        value: String,
        message: 'This is a required field',
      },
    },
    last_name: {
      required: {
        value: String,
        message: 'This is a required field',
      },
    },
    email: {
      required: {
        value: String,
        message: 'This is a required field',
      },
      pattern: {
        value: /\S+@\S+\.\S+/, // Regex Email Validation
        message: 'Invalid Email Provided',
      },
    },
    password: {
      required: {
        value: String,
        message: 'This is a required field',
      },
    },
  };

  return (
    <Container maxWidth="xs" sx={{ pt: 8 }}>
      <Stack sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Create your FREE Account
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>It&#39;s free and always be.</Typography>
      </Stack>

      <Box component="form" noValidate onSubmit={handleSubmit(handleSignUp)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('first_name', validationRules.first_name)}
              error={errors && errors.first_name ? true : false}
              helperText={errors ? errors?.first_name?.message : null}
              name="first_name"
              required
              fullWidth
              id="first_name"
              label="First Name"
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register('last_name', validationRules.last_name)}
              error={errors && errors.last_name ? true : false}
              helperText={errors ? errors?.last_name?.message : null}
              required
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
              type="text"
              autoComplete="family-name"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register('email', validationRules.email)}
              error={errors && errors.email ? true : false}
              helperText={errors ? errors?.email?.message : null}
              fullWidth
              label="Email Address"
              name="email"
              type="text"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register('password', validationRules.password)}
              error={errors && errors.password ? true : false}
              helperText={errors ? errors?.password?.message : null}
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth size="large" type="submit" variant="contained">
              Register
            </Button>

            <Typography color="text.secondary" variant="body2" sx={{ mt: 2 }}>
              By clicking Register, you agree that you have read and agree to the{' '}
              <Link to="/terms" target="_blank">
                Terms & Conditions.
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {registered && (
        <Alert severity="success" sx={{ my: 4 }}>
          Please check your inbox for a confirmation email. Click the link to complete the
          registration process.
        </Alert>
      )}
    </Container>
  );
}

export default Signup;
