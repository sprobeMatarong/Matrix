import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Typography, Box, TextField, Button, Grid, Card } from '@mui/material';
import { useTranslation } from 'react-i18next';
import api from '../../utils/api';
import { toast } from 'react-toastify';

function Inquiry() {
  const { t } = useTranslation();

  // form validation
  const schema = yup.object({
    fullname: yup.string().required(t('form.required')),
    email: yup.string().required(t('form.required')).email(t('form.email')),
    inquiry_content: yup.string().required(t('form.required')),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleInquiry = async (data) => {
    const { fullname, email, inquiry_content: content } = data;
    await api
      .post('/inquiries', { fullname, email, content })
      .then(() => {
        toast(t('pages.inquiry.success_message'), { type: 'success' });
        // clear form
        reset();
      })
      .catch(() => {
        toast(t('pages.inquiry.failed_message'), { type: 'error' });
      });
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 8 }}>
      <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold', mb: 2 }} align="center">
        {t('pages.inquiry.heading')}
      </Typography>

      <Typography align="center" color="text.secondary" component="p" sx={{ mb: 4 }}>
        {t('pages.inquiry.sub_heading')}
      </Typography>

      <Card sx={{ p: 4 }}>
        <Box component="form" noValidate onSubmit={handleSubmit(handleInquiry)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register('fullname')}
                error={errors && errors.fullname ? true : false}
                helperText={errors ? errors?.fullname?.message : null}
                fullWidth
                id="fullname"
                label={t('labels.fullname')}
                name="fullname"
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
                {...register('inquiry_content')}
                error={errors && errors.inquiry_content ? true : false}
                helperText={errors ? errors?.inquiry_content?.message : null}
                fullWidth
                label={t('labels.inquiry_content')}
                name="inquiry_content"
                multiline
                rows={4}
                type="text"
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <Button fullWidth size="large" type="submit" variant="contained" disableElevation>
                {t('labels.submit')}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  );
}

export default Inquiry;
