import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { logout } from 'services/auth';
import { Box } from '@mui/material';
import Footer from 'components/organisms/User/Footer';
import Navbar from 'components/organisms/User/Navbar';

export default function User() {
  const user = useSelector((state) => state.profile.user);

  const handleLogout = async () => {
    await logout();
    localStorage.clear();
    window.location = '/login?ref=logout';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Navbar open={open} onLogout={() => handleLogout()} user={user} />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          pb: 8,
          minHeight: 'calc(100vh - 313px)',
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}
