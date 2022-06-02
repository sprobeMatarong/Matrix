import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();

  return (
    <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
      <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
        {t('pages.dashboard.main_heading')}
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" component="p">
        {t('pages.dashboard.sub_heading')}
      </Typography>

      <Box textAlign="center" sx={{ mt: 2 }}>
        <Button component={Link} to="/login" variant="contained" size="large" disableElevation>
          {t('labels.get_started')}
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
