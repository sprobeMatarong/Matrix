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

function Login() {
  const { login } = useAuth();

  // form validation
  const schema = yup.object({
    username: yup.string().required().email(),
    password: yup.string().required(),
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
      .then(() => (window.location = '/'))
      .catch((err) => console.log(err.response.data));
  };

  return (
    <Container maxWidth="xs" sx={{ pt: 8 }}>
      <Stack sx={{ mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Sign in
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
      </Stack>

      <form onSubmit={handleSubmit(handleLogin)}>
        <Stack spacing={3}>
          <TextField
            {...register('username')}
            error={errors && errors.username ? true : false}
            helperText={errors ? errors?.username?.message : null}
            fullWidth
            label="Email Address"
            name="username"
            type="text"
            variant="outlined"
          />

          <TextField
            {...register('password')}
            error={errors && errors.password ? true : false}
            helperText={errors ? errors?.password?.message : null}
            fullWidth
            label="Password"
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
              <FormControlLabel control={<Checkbox {...field} />} label="Remember me" />
            )}
          />

          <Link component={RouterLink} variant="subtitle2" to="/forgot-password">
            Forgot password?
          </Link>
        </Stack>

        <Button fullWidth size="large" type="submit" variant="contained">
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;
