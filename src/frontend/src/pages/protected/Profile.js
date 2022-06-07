import * as yup from 'yup';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Typography, Grid, TextField, Box, Card } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import AvatarField from '../../components/AvatarField';
import { useAuth } from '../../hooks/useAuth';

function Profile() {
  const { t } = useTranslation();
  const { user, mutate } = useAuth();
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
      .then(({ data }) => {
        setLoading(false);
        mutate({ ...user, ...{ user: data.data } });
        toast(t('pages.profile.success_message'), { type: 'success' });
      })
      .catch((err) => {
        const { data } = err.response;
        setLoading(false);
        if (data.error['avatar']) {
          toast(data.error.avatar[0], { type: 'error' });
        } else toast(t('pages.profile.failed_message'), { type: 'error' });
      });
  };

  useEffect(() => {
    if (user) {
      setValue('first_name', user.first_name);
      setValue('last_name', user.last_name);
      setValue('email', user.email);
    }
  }, []);

  return (
    <Container maxWidth="sm" sx={{ pt: 6 }}>
      <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold', mb: 2 }} align="center">
        {t('pages.profile.heading')}
      </Typography>

      <Typography align="center" color="text.secondary" component="p" sx={{ mb: 4 }}>
        {t('pages.profile.sub_heading')}
      </Typography>

      {user && (
        <Card sx={{ p: 3 }}>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <Grid container spacing={3}>
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
        </Card>
      )}
    </Container>
  );
}

export default Profile;
