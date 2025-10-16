import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToAdminLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/admin/login', { replace: true });
  }, [navigate]);

  return null; // This component doesn't render anything, it just redirects
};

export default RedirectToAdminLogin;
