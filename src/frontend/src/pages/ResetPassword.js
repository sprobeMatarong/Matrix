import * as yup from 'yup';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useQuery } from '../hooks/useQuery';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Container, Stack, Typography, TextField, Button, Box, Grid } from '@mui/material';

function ResetPassword() {
  const query = useQuery();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [alert, setAlert] = useState(null);
  const [token, setToken] = useState(null);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setToken(() => query.get('token'));
    if (token) verifyToken();
  }, [token]);

  // form validation
  const schema = yup.object({
    password: yup
      .string()
      .required(t('form.required'))
      .min(8, t('form.password.minLength'))
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        t('form.password.strong')
      ),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], t('form.password.confirm')),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleReset = async (data) => {
    const { password, password_confirmation } = data;
    return await api
      .post('password/reset', { password, password_confirmation, token })
      .then(() => {
        toast(t('pages.reset_password.success'), {
          type: 'success',
        });

        setTimeout(() => navigate('/login'), 1000);
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

  const verifyToken = async () => {
    const query = new URLSearchParams({ type: 'password_reset', token }).toString();

    await api
      .get(`/token/verify?${query}`)
      .then(({ data }) => {
        const { verified } = data.data;
        setValid(verified);
      })
      .catch(() => navigate('/page-not-found'));
  };

  return (
    <Container maxWidth="xs" sx={{ pt: 8 }}>
      {valid && (
        <>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              {t('labels.reset_password')}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {t('pages.reset_password.sub_heading')}
            </Typography>
          </Stack>

          <Box component="form" noValidate onSubmit={handleSubmit(handleReset)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  {...register('password')}
                  error={errors && errors.password ? true : false}
                  helperText={errors ? errors?.password?.message : null}
                  fullWidth
                  label={t('labels.new_password')}
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
                  label={t('labels.confirm_new_password')}
                  name="password_confirmation"
                  type="password"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <Button fullWidth size="large" type="submit" variant="contained">
                  {t('labels.submit')}
                </Button>
              </Grid>
            </Grid>

            {alert && (
              <Alert severity={alert.success ? 'success' : 'error'} sx={{ my: 4 }}>
                {alert.message}
              </Alert>
            )}
          </Box>
        </>
      )}
    </Container>
  );
}

export default ResetPassword;
