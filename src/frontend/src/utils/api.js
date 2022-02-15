import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

api.interceptors.request.use((request) => {
  const access_token = localStorage.getItem('access_token');
  if (access_token) request.headers.common.Authorization = `Bearer ${access_token}`;
  return request;
});

const handleResponse = (response) => response;
const handleError = (error) => {
  const code = error.response && parseInt(error.response.status);
  const originalRequest = error.config;
  const { data } = originalRequest;
  let params = data ? JSON.parse(data) : null;
  // handle data with file upload attachments
  if (data && data instanceof FormData) {
    params = data;
  }

  // handle failed attempt on refreshing the token
  if (
    code === 401 &&
    originalRequest.url === '/oauth/token' &&
    params.grant_type === 'refresh_token'
  ) {
    // remove from store
    localStorage.clear();
    window.location = '/login';
  }

  const refresh_token = localStorage.getItem('refresh_token');

  if (code === 401 && originalRequest.url !== '/oauth/token' && refresh_token) {
    return new Promise((resolve, reject) => {
      api
        .post('/oauth/token', {
          grant_type: 'refresh_token',
          refresh_token,
          client_id: process.env.REACT_APP_CLIENT_ID,
          client_secret: process.env.REACT_APP_CLIENT_SECRET,
          scope: '',
        })
        .then(({ data }) => {
          const { access_token, refresh_token, expires_in } = data;

          // update localstorage
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          localStorage.setItem('expires_in', expires_in);

          // update bearer token in current axios request
          originalRequest.headers.Authorization = `Bearer ${access_token}`;

          resolve(data);
        })
        .catch((e) => reject(e));
    })
      .then(() => api(originalRequest)) // proceed to original request
      .catch(() => (window.location = '/login')); // force redirect to login page
  }

  return Promise.reject(error);
};

// Add a response error interceptor
api.interceptors.response.use(handleResponse, handleError);

export default api;
