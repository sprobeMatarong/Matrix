import * as yup from 'yup';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useQuery } from '../hooks/useQuery';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Typography, Stack, TextField, Grid } from '@mui/material';

function Activate() {
  const query = useQuery();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [token, setToken] = useState(null);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleActivate = async (data) => {
    const { password, password_confirmation } = data;
    setLoading(true);

    await api
      .post('/activate', { token, password, password_confirmation })
      .then(() => {
        setLoading(false);
        toast(t('pages.activate.activated'), {
          type: 'success',
        });
        setTimeout(() => {
          window.location = '/login';
        }, 500);
      })
      .catch((err) => {
        const { message } = err.response.data;
        toast(message, { type: 'error' });
        setLoading(false);
      });
  };

  const verifyToken = async () => {
    const query = new URLSearchParams({ type: 'activation', token }).toString();

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
              {t('pages.activate.heading')}
            </Typography>

            <Typography variant="p" gutterBottom>
              {t('pages.activate.subtitle')}
            </Typography>
          </Stack>

          <form onSubmit={handleSubmit(handleActivate)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
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

              <Grid item xs={12}>
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
                <LoadingButton
                  color="primary"
                  loading={loading}
                  loadingPosition="start"
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ height: 48 }}
                  startIcon={<SendIcon />}
                >
                  {t('labels.submit')}
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </>
      )}
    </Container>
  );
}

export default Activate;
