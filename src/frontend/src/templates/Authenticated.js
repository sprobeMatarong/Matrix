import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Box, Container, CssBaseline, Toolbar } from '@mui/material';
import Footer from 'components/organisms/Authenticated/Footer';
import Navbar from 'components/organisms/Authenticated/Navbar';
import Sidebar from 'components/organisms/Authenticated/Sidebar';

function Authenticated() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);
  const location = useLocation();
  const { user, logout } = useAuth({ middleware: 'auth', location });

  return (
    <>
      <CssBaseline />

      {user && (
        <Box sx={{ display: 'flex' }}>
          <Navbar open={open} onToggle={toggleDrawer} onLogout={logout} user={user} />

          <Sidebar open={open} onToggle={toggleDrawer} />

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Outlet />

              <Footer />
            </Container>
          </Box>
        </Box>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </>
  );
}

export default Authenticated;
