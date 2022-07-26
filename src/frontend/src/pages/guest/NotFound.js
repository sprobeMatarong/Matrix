import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

function NotFound() {
  const { t } = useTranslation();

  return (
    <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
      <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
        404 Not Found
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" component="p">
        {t('pages.not_found.sub_heading')}
      </Typography>

      <Box textAlign="center" sx={{ mt: 2 }}>
        <Button component={Link} to="/" variant="contained" size="large" disableElevation>
          {t('pages.not_found.back_to_top')}
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound;
