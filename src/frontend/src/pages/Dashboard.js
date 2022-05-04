import { Container, Grid, Box } from '@mui/material';
import NumberWidget from '../components/NumberWidget';

function Dashboard() {
  const widgets = [
    { label: 'New Users', value: 35 },
    { label: 'Total Sales', value: 35750 },
    { label: 'Orders', value: 540 },
  ];

  return (
    <Container disableGutters component="main" sx={{ pt: 4, pb: 6 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          {widgets.map((widget, key) => {
            return (
              <Grid item xs={4} key={key}>
                <NumberWidget label={widget.label} value={widget.value} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard;
