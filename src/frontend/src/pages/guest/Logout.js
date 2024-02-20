import { useEffect } from 'react';
import { logout } from 'services/auth';

export default function Logout() {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
      } catch (e) {
        console.log(e.message);
      }
      localStorage.clear();
      window.location = '/login?ref=logout';
    };

    handleLogout();
  }, []);
}
