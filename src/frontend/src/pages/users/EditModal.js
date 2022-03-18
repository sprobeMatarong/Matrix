import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../components/Modal';
import { Grid, TextField } from '@mui/material';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';

EditModal.propTypes = {
  open: PropTypes.bool,
  user: PropTypes.object,
  handleClose: PropTypes.func,
};

export default function EditModal({ open, handleClose }) {
  const { t } = useTranslation();

  // form validation
  const schema = yup.object({
    email: yup.string().required(t('form.required')).email(t('form.email')),
    password: yup.string().required(t('form.required')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { checkbox: false },
  });

  const handleUpdate = (data) => {
    console.log(data);
  };

  return (
    <Modal open={open} handleClose={handleClose} title="Edit User">
      <form onSubmit={handleSubmit(handleUpdate)}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item md={6}>
            <TextField
              {...register('email')}
              error={errors && errors.email ? true : false}
              helperText={errors ? errors?.email?.message : null}
              fullWidth
              label={t('labels.first_name')}
              name="email"
              type="text"
              variant="outlined"
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              {...register('email')}
              error={errors && errors.email ? true : false}
              helperText={errors ? errors?.email?.message : null}
              fullWidth
              label={t('labels.last_name')}
              name="email"
              type="text"
              variant="outlined"
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
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              {...register('email')}
              error={errors && errors.email ? true : false}
              helperText={errors ? errors?.email?.message : null}
              fullWidth
              label={t('labels.password')}
              name="email"
              type="text"
              variant="outlined"
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              {...register('email')}
              error={errors && errors.email ? true : false}
              helperText={errors ? errors?.email?.message : null}
              fullWidth
              label={t('labels.confirm_new_password')}
              name="email"
              type="text"
              variant="outlined"
            />
          </Grid>
          <Grid item md={12}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
}
