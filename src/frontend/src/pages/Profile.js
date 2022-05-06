import * as yup from 'yup';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Typography, Grid, TextField, Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import AvatarField from '../components/AvatarField';

function Profile() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // form validation
  const schema = yup.object({
    first_name: yup.string().required(t('form.required')),
    last_name: yup.string().required(t('form.required')),
    email: yup.string().required(t('form.required')).email(t('form.email')),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getUserProfile = async () => {
    return await api.get('/profile').then(({ data }) => {
      setUser(data.data);
    });
  };

  const handleUpdate = async (data) => {
    setLoading(true);

    let formData = new FormData();
    formData.append('_method', 'PUT');

    // set fields
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    return await api
      .post('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        setLoading(false);
        toast(t('pages.users.user_updated'), { type: 'success' });
      })
      .catch((err) => {
        const { data } = err.response;
        setLoading(false);
        if (data.error['avatar']) {
          toast(data.error.avatar[0], { type: 'error' });
        } else toast('Unable to update user details.', { type: 'error' });
      });
  };

  useEffect(() => {
    if (user) {
      setValue('first_name', user.first_name);
      setValue('last_name', user.last_name);
      setValue('email', user.email);
    } else getUserProfile();
  }, [user]);

  return (
    <Container maxWidth="sm" sx={{ pt: 6 }}>
      <Typography variant="h4" component="h4" sx={{ mb: 3 }}>
        Edit Profile
      </Typography>

      {user && (
        <form onSubmit={handleSubmit(handleUpdate)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <AvatarField
                width={140}
                label={user.full_name}
                url={user.avatar}
                onFileSelect={(url) => setValue('avatar', url)}
                editable={true}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                {...register('first_name')}
                error={errors && errors.first_name ? true : false}
                helperText={errors ? errors?.first_name?.message : null}
                fullWidth
                label={t('labels.first_name')}
                name="first_name"
                type="text"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                {...register('last_name')}
                error={errors && errors.last_name ? true : false}
                helperText={errors ? errors?.last_name?.message : null}
                fullWidth
                label={t('labels.last_name')}
                name="last_name"
                type="text"
                variant="outlined"
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
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                <LoadingButton
                  color="primary"
                  loading={loading}
                  loadingPosition="start"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  type="submit"
                >
                  {t('labels.update')}
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Container>
  );
}

export default Profile;
