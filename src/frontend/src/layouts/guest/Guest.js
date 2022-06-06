import { Outlet } from 'react-router-dom';
import { CssBaseline, Box, Typography } from '@mui/material';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
          flexGrow: 1,
          height: 'calc(100vh - 66px)',
          overflow: 'auto',
        }}
      >
        <Outlet />

        <Box sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="body2" component="span">
            &copy; 2022 {process.env.REACT_APP_SITE_TITLE}.
          </Typography>
        </Box>
      </Box>

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
