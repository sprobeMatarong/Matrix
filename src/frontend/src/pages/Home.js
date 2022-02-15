import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
      <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
        React Base Template
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" component="p">
        Your lightweight boilerplate on developing React Projects.
      </Typography>

      <Box textAlign="center" sx={{ mt: 2 }}>
        <Button component={Link} to="/login" variant="contained" size="large" disableElevation>
          Get Started
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
