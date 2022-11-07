import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from 'hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Box, Card, Container, Grid, Link } from '@mui/material';
import Button from 'components/atoms/Button';
import TextField from 'components/atoms/Form/TextField';
import PageTitle from 'components/atoms/PageTitle';

function Login() {
  const { login } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();

  // form validation
  const schema = yup.object({
    username: yup.string().required(t('form.required')).email(t('form.email')),
    password: yup.string().required(t('form.required')),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { checkbox: false },
  });

  const handleLogin = async (data) => {
    const { username, password } = data;
    await login({ username, password, setError })
      .then(() => {
        const query = new URLSearchParams(location.search);
        window.location = query.get('redirect_to') ?? '/dashboard';
      })
      .catch((err) => {
        const { message } = err.response.data;
        toast(message, { type: 'error' });
      });
  };

  return (
    <Container maxWidth="xs" sx={{ pt: 8 }}>
      <Card sx={{ p: 4 }}>
        <PageTitle title={t('labels.login')} />

        <Box component="form" noValidate onSubmit={handleSubmit(handleLogin)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register('username')}
                error={errors && errors.username ? true : false}
                helperText={errors ? errors?.username?.message : null}
                fullWidth
                label={t('labels.email_address')}
                name="username"
                type="text"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('password')}
                error={errors && errors.password ? true : false}
                helperText={errors ? errors?.password?.message : null}
                fullWidth
                label={t('labels.password')}
                name="password"
                type="password"
              />
            </Grid>

            <Grid item xs={12}>
              <Button fullWidth type="submit">
                {t('labels.login')}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Link
                component={RouterLink}
                variant="subtitle2"
                to="/forgot-password"
                sx={{
                  textAlign: 'center',
                  width: '100%',
                  display: 'block',
                  textDecoration: 'none',
                }}
              >
                {t('labels.forgot_password')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
}

export default Login;
