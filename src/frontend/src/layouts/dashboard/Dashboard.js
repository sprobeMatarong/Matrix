import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Container, CssBaseline, Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function Dashboard() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => setOpen(!open);
  const { user, logout } = useAuth({ middleware: 'auth' });

  return (
    <>
      {user && (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
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

export default Dashboard;
