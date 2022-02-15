import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Navbar from './Navbar';

function Guest() {
  return (
    <>
      <CssBaseline />
      <Navbar />

      <Outlet />
    </>
  );
}

export default Guest;
