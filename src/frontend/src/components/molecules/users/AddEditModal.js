import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from 'components/atoms/Button';
import TextField from 'components/atoms/Form/TextField';
import Modal from 'components/organisms/Modal';
import api from 'utils/api';

AddEditModal.propTypes = {
  open: PropTypes.bool,
  user: PropTypes.object,
  handleSaveEvent: PropTypes.func,
  handleClose: PropTypes.func,
};

export default function AddEditModal(props) {
  const { user, open, handleClose, handleSaveEvent } = props;

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
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
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

  useEffect(() => {
    if (!open) clearErrors();
  }, [open]);

  const handleFormSubmit = (data) => {
    setLoading(true);
    const req = user ? api.put(`/users/${user.id}`, data) : api.post('/users', data);

    req
      .then((res) => {
        handleSaveEvent(res.data.data);
        setLoading(false);
        reset();
      })
      .catch((err) => {
        setLoading(false);
        const { error } = err.response.data;
        if (typeof error === 'object') {
          Object.keys(error).map((prop) => {
            setError(prop, { message: error[prop][0] }, { shouldFocus: true });
          });
          return;
        }
        toast(error, { type: 'error' });
      });
  };

  return (
    <Modal open={open} handleClose={handleClose} title={title}>
      <Box sx={{ pt: 2 }}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                size="small"
              />
            </Grid>
          </Grid>

          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end', px: 2, pb: 2, gap: 1 }}>
            <Button onClick={handleClose} variant="outlined" disabled={loading}>
              {t('labels.cancel')}
            </Button>

            <Button disabled={loading} type="submit">
              {user ? t('labels.update') : t('labels.save')}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
