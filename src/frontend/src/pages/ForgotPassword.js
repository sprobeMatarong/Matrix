import { Alert, Container, Stack, Typography, TextField, Button, Box, Grid } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../utils/api';

function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  const handleForgot = async (data) => {
    await api
      .post('/password/forgot', data)
      .then(() => {
        setSubmitted(true);
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
    email: {
      required: {
        value: String,
        message: 'This field is required.',
      },
      pattern: {
        value: /\S+@\S+\.\S+/, // Regex Email Validation
        message: 'Please Provide a valid email',
      },
    },
  };

  return (
    <Container maxWidth="xs" sx={{ pt: 8 }}>
      <Stack sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Forgot Password?
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          Enter your email below to recover your account.
        </Typography>
      </Stack>

      <Box component="form" noValidate onSubmit={handleSubmit(handleForgot)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
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
            <Button fullWidth size="large" type="submit" variant="contained">
              Forgot
            </Button>
          </Grid>
        </Grid>

        {submitted && (
          <Alert severity="success" sx={{ my: 4 }}>
            Please check your inbox for the instructions on how to reset your password.
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default ForgotPassword;
