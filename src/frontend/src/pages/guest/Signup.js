import { Alert, Container, Typography, Box, TextField, Button, Grid, Card } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import PageTitle from '../../components/atoms/PageTitle';

function Signup() {
  const [alert, setAlert] = useState(null);
  const { t } = useTranslation();

  // form validation
  const schema = yup.object({
    first_name: yup.string().required(t('form.required')),
    last_name: yup.string().required(t('form.required')),
    email: yup.string().required(t('form.required')).email(t('form.email')),
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
    reset,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSignUp = async (data) => {
    return await api
      .post('/register', data)
      .then(() => {
        setAlert({
          success: true,
          message:
            'Please check your inbox for a confirmation email. Click the link to complete the registration process.',
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

  return (
    <Container maxWidth="xs" sx={{ pt: 8 }}>
      <Card sx={{ p: 4 }}>
        <PageTitle title={t('pages.signup.create_free_account')} />

        <Box component="form" noValidate onSubmit={handleSubmit(handleSignUp)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('first_name')}
                error={errors && errors.first_name ? true : false}
                helperText={errors ? errors?.first_name?.message : null}
                name="first_name"
                fullWidth
                id="first_name"
                label={t('labels.first_name')}
                type="text"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('last_name')}
                error={errors && errors.last_name ? true : false}
                helperText={errors ? errors?.last_name?.message : null}
                fullWidth
                id="last_name"
                label={t('labels.last_name')}
                name="last_name"
                type="text"
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('email')}
                error={errors && errors.email ? true : false}
                helperText={errors ? errors?.email?.message : null}
                fullWidth
                label={t('labels.email_address')}
                name="email"
                type="text"
                variant="outlined"
                size="small"
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
                label={t('labels.confirm_password')}
                name="password_confirmation"
                type="password"
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <Button fullWidth size="large" type="submit" variant="contained" disableElevation>
                {t('labels.signup')}
              </Button>

              <Typography color="text.secondary" variant="body2" sx={{ mt: 2 }}>
                {t('pages.signup.agree_to_terms')}{' '}
                <Link to="/terms" target="_blank">
                  {t('pages.signup.terms_conditions')}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>

      {alert && (
        <Alert severity={alert.success ? 'success' : 'error'} sx={{ my: 4 }}>
          {alert.message}
        </Alert>
      )}
    </Container>
  );
}

export default Signup;
