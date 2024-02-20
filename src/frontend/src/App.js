import { HelmetProvider } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { setProfile } from 'store/slices/profileSlice';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import api from 'utils/api';
import Router from './router';
import theme from './theme';

function App() {
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    const user = await api.get('/profile').then((res) => res.data.data);
    dispatch(setProfile(user));
  };

  const accessToken = localStorage.getItem('access_token');
  if (accessToken) fetchProfile();

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Router />
      </ThemeProvider>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </HelmetProvider>
  );
}

export default App;
