import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
      <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
        404 Not Found
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" component="p">
        We can&#39;t seem to find the page you&#39;re looking for.
      </Typography>

      <Box textAlign="center" sx={{ mt: 2 }}>
        <Button component={Link} to="/" variant="contained" size="large" disableElevation>
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound;
