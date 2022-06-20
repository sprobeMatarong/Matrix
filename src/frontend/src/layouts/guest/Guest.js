import { Outlet } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Footer from './Footer';

function Guest() {
  return (
    <>
      <CssBaseline />
      <Navbar />

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

export default Guest;
