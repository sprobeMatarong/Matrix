import { useEffect, useState } from 'react';
import { Alert, Container, Stack, Typography, TextField, Button, Box, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import api from '../utils/api';

function ResetPassword() {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    setValue('token', url.searchParams.get('token'));
  }, []);

  const handleReset = async (data) => {
    return await api
      .post('password/reset', data)
      .then(() => {
        setAlert({
          success: true,
          message: 'Your password has been updated successfully.',
        });
        reset();
      })
      .catch((err) => {
        const { error } = err.response.data;
        if (typeof error === 'object') {
          Object.keys(error).map((prop) => {
            setError(prop, { message: error[prop][0] }, { shouldFocus: true });
          });
        } else setAlert({ success: false, message: error });
      });
  };

  // form validation
  const schema = yup.object({
    password: yup
      .string()
      .required()
      .min(8)
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Password must contain the following: 1 uppercase, 1 special character and a minimum of 8 characters.'
      ),
    password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <Container maxWidth="xs" sx={{ pt: 8 }}>
      <Stack sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Reset Password
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>Please enter your new password.</Typography>
      </Stack>

      <Box component="form" noValidate onSubmit={handleSubmit(handleReset)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              {...register('password')}
              error={errors && errors.password ? true : false}
              helperText={errors ? errors?.password?.message : null}
              fullWidth
              label="New Password"
              name="password"
              type="password"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              {...register('password_confirmation')}
              error={errors && errors.password_confirmation ? true : false}
              helperText={errors ? errors?.password_confirmation?.message : null}
              fullWidth
              label="Confirm New Password"
              name="password_confirmation"
              type="password"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth size="large" type="submit" variant="contained">
              Reset
            </Button>
          </Grid>
        </Grid>

        {alert && (
          <Alert severity={alert.success ? 'success' : 'error'} sx={{ my: 4 }}>
            {alert.message}
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default ResetPassword;
