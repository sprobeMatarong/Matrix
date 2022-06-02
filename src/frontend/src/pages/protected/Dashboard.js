import { Container, Grid, Box, Typography } from '@mui/material';
import NumberWidget from '../../components/NumberWidget';
import LineChart from '../../components/dashboard/LineChart';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t } = useTranslation();

  const widgets = [
    { label: t('pages.dashboard.new_users'), value: 35 },
    {
      label: t('pages.dashboard.total_sales'),
      value: 35750,
    },
    {
      label: t('pages.dashboard.total_orders'),
      value: 540,
    },
  ];

  return (
    <Container disableGutters component="main" sx={{ pt: 4, pb: 6 }}>
      <Box sx={{ flexGrow: 1, mb: 4 }}>
        <Typography component="h3" variant="h3" align="left" color="text.primary" gutterBottom>
          {t('pages.dashboard.main_heading')}
        </Typography>
        <Typography variant="h5" align="left" color="text.secondary" component="p">
          {t('pages.dashboard.sub_heading')}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          {widgets.map((widget, key) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <NumberWidget label={widget.label} value={widget.value} />
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Static Line Chart For Demo Purposes */}
      <LineChart />
    </Container>
  );
}

export default Dashboard;
