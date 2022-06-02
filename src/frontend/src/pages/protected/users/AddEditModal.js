import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../components/Modal';
import { Grid, TextField } from '@mui/material';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import api from '../../../utils/api';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

AddEditModal.propTypes = {
  open: PropTypes.bool,
  user: PropTypes.object,
  handleSaveEvent: PropTypes.func,
  handleClose: PropTypes.func,
};

export default function AddEditModal({ user, open, handleClose, handleSaveEvent }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(null);

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
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    clearErrors();
    setLoading(false);

    setTitle(t('pages.users.add_user'));
    setValue('first_name', '');
    setValue('last_name', '');
    setValue('email', '');

    if (user) {
      // pre-fill the form
      setTitle(t('pages.users.edit_user'));
      setValue('first_name', user.first_name);
      setValue('last_name', user.last_name);
      setValue('email', user.email);
    }
  }, [user]);

  const handleUpdate = (data) => {
    setLoading(true);
    const req = user ? api.put(`/users/${user.id}`, data) : api.post('/users', data);

    req
      .then((res) => {
        handleSaveEvent(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal open={open} handleClose={handleClose} title={title}>
      <Box sx={{ pt: 2 }}>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item md={6}>
              <TextField
                {...register('first_name')}
                error={errors && errors.first_name ? true : false}
                helperText={errors ? errors?.first_name?.message : null}
                fullWidth
                label={t('labels.first_name')}
                name="first_name"
                type="text"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                {...register('last_name')}
                error={errors && errors.last_name ? true : false}
                helperText={errors ? errors?.last_name?.message : null}
                fullWidth
                label={t('labels.last_name')}
                name="last_name"
                type="text"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item md={12}>
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
          </Grid>

          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end', px: 2, pb: 2 }}>
            <LoadingButton
              color="primary"
              loading={loading}
              loadingPosition="start"
              variant="contained"
              startIcon={<SaveIcon />}
              type="submit"
            >
              {user ? t('labels.update') : t('labels.save')}
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
