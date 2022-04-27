import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function Guest() {
  return (
    <>
      <CssBaseline />
      <Navbar />

      <Outlet />

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
