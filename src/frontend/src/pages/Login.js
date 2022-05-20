import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Stack,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Button,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

function Login() {
  const { login } = useAuth();
  const { t } = useTranslation();

  // form validation
  const schema = yup.object({
    username: yup.string().required(t('form.required')).email(t('form.email')),
    password: yup.string().required(t('form.required')),
  });

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { checkbox: false },
  });

  const handleLogin = async (data) => {
    const { username, password } = data;
    await login({ username, password, setError })
      .then(() => (window.location = '/dashboard'))
      .catch((err) => {
        const { message } = err.response.data;
        toast(message, { type: 'error' });
      });
  };

  return (
    <Container maxWidth="xs" sx={{ pt: 8 }}>
      <Stack sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          {t('labels.login')}
        </Typography>
      </Stack>

      <form onSubmit={handleSubmit(handleLogin)}>
        <Stack spacing={3}>
          <TextField
            {...register('username')}
            error={errors && errors.username ? true : false}
            helperText={errors ? errors?.username?.message : null}
            fullWidth
            label={t('labels.email_address')}
            name="username"
            type="text"
            variant="outlined"
          />

          <TextField
            {...register('password')}
            error={errors && errors.password ? true : false}
            helperText={errors ? errors?.password?.message : null}
            fullWidth
            label={t('labels.password')}
            name="password"
            type="password"
            variant="outlined"
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Controller
            name="checkbox"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <FormControlLabel control={<Checkbox {...field} />} label={t('labels.remember_me')} />
            )}
          />

          <Link component={RouterLink} variant="subtitle2" to="/forgot-password">
            {t('labels.forgot_password')}
          </Link>
        </Stack>

        <Button fullWidth size="large" type="submit" variant="contained">
          {t('labels.login')}
        </Button>
      </form>
    </Container>
  );
}

export default Login;
