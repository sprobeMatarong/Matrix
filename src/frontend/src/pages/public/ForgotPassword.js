import { Container, Typography, TextField, Button, Box, Grid, Card } from '@mui/material';
import { useForm } from 'react-hook-form';
import api from '../../utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // form validation
  const schema = yup.object({
    email: yup.string().required(t('form.required')).email(t('form.email')),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({ resolver: yupResolver(schema) });

  const handleForgot = async (data) => {
    return await api
      .post('/password/forgot', data)
      .then(() => {
        reset();
        navigate('/login');
        toast(t('pages.forgot_password.success'), { type: 'success' });
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

  return (
    <Container maxWidth="xs" sx={{ pt: 8 }}>
      <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold', mb: 2 }} align="center">
        {t('labels.forgot_password')}
      </Typography>

      <Typography align="center" color="text.secondary" component="p" sx={{ mb: 4 }}>
        {t('pages.forgot_password.sub_heading')}
      </Typography>

      <Card sx={{ p: 4 }}>
        <Box component="form" noValidate onSubmit={handleSubmit(handleForgot)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
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

export default ForgotPassword;
