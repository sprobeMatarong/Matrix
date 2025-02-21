import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { addingNum } from 'services/addition.service';
import * as yup from 'yup';
import { Box, Card, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Button from 'components/atoms/Button';
import TextField from 'components/atoms/Form/TextField';
import PageTitle from 'components/atoms/PageTitle';
import Typography from 'theme/typography';
import errorHandler from 'utils/errorHandler';


function Sum() {
    const { t } = useTranslation();

    // form validation
    const schema = yup.object({
        firstNum: yup.number().required(t('form.required')),
        secondNum: yup.number().required(t('form.required')),
    });

    const {
        reset,
        setValue,
        setError,
        handleSubmit,
        formState: { errors },
        register,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleAdding = async (data) => {
        try {
            const result = await addingNum(data);
            setValue('result', result.result); // Fix here
         
        } catch (err) {
            errorHandler(err, setError);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ pt: 8 }}>
            <Grid container spacing={4}>
                <Grid item xs={8} md={6}>
                    <Card sx={{ p: 4 }}>
                        <PageTitle title={t('pages.sum.sum_2_num')} />

                        <Box component="form" noValidate onSubmit={handleSubmit(handleAdding)} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        {...register('firstNum')}
                                        error={errors && errors.firstNum ? true : false}
                                        helperText={errors ? errors?.firstNum?.message : null}
                                        name="firstNum"
                                        fullWidth
                                        id="firstNum"
                                        label={t('pages.sum.enter_num1')}
                                        type="text"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        {...register('secondNum')}
                                        error={errors && errors.secondNum ? true : false}
                                        helperText={errors ? errors?.secondNum?.message : null}
                                        fullWidth
                                        id="secondNum"
                                        label={t('pages.sum.enter_num2')}
                                        name="secondNum"
                                        type="text"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth type="submit">
                                        {t('pages.sum.sum')}
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '40px',
                                            border: '1px solid rgba(0, 0, 0, 0.23)',
                                            borderRadius: '4px',
                                            padding: '0 14px',
                                            backgroundColor: '#f5f5f5',
                                        }}
                                    >
                                        {watch('result') || ''}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
        
                    <TableContainer component={Paper} sx={{ mt: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t('pages.sum.enter_num1')}</TableCell>
                                    <TableCell>{t('pages.sum.enter_num2')}</TableCell>
                                    <TableCell>{t('pages.sum.answer')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{watch('firstNum')}</TableCell>
                                    <TableCell>{watch('secondNum')}</TableCell>
                                    <TableCell>{watch('result')}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Sum;