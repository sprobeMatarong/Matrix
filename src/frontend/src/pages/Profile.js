import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

function Profile() {
  return (
    <>
      <main>
        <Typography variant="h4">Profile</Typography>
        <Typography variant="body2">
          This is a protected page. User must be authenticated.
        </Typography>
      </main>
      <nav>
        <Link to="/about">Home</Link>
      </nav>
    </>
  );
}

export default Profile;
