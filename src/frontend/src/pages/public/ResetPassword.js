import * as yup from 'yup';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useQuery } from '../../hooks/useQuery';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Typography, TextField, Button, Box, Grid, Card } from '@mui/material';

function ResetPassword() {
  const query = useQuery();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [token, setToken] = useState(null);

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
        navigate('/login');
        toast(t('pages.reset_password.success'), {
          type: 'success',
        });
      })
      .catch((err) => {
        const { error } = err.response.data;
        if (typeof error === 'object') {
          return Object.keys(error).map((prop) => {
            setError(prop, { message: error[prop][0] }, { shouldFocus: true });
          });
        }

        toast(error, { type: 'error' });
      });
  };

  const verifyToken = async () => {
    const query = new URLSearchParams({ type: 'password_reset', token }).toString();

    return await api.get(`/token/verify?${query}`).catch(() => navigate('/page-not-found'));
  };

  return (
    <Container maxWidth="xs" sx={{ pt: 8 }}>
      <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold', mb: 2 }} align="center">
        {t('labels.reset_password')}
      </Typography>

      <Typography align="center" color="text.secondary" component="p" sx={{ mb: 4 }}>
        {t('pages.reset_password.sub_heading')}
      </Typography>

      <Card sx={{ p: 4 }}>
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
                size="small"
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
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <Button fullWidth size="large" type="submit" variant="contained">
                {t('labels.submit')}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
}

export default ResetPassword;
