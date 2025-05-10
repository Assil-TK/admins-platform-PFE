import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/github/callback${window.location.search}`, {
          credentials: 'include'
        });

        if (!response.ok) throw new Error('Authentication failed');

        const data = await response.json();

        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/repo-explorer');
      } catch (error) {
        console.error('OAuth Callback Error:', error);
        navigate('/');
      }
    };

    fetchUser();
  }, [navigate, API_URL]);

  return <div>Authenticating with GitHub...</div>;
};

export default AuthCallback;
