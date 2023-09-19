import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useLocation } from 'react-router-dom';

const LoggedOutRoute = ({ children }) => {
  
  const { currentUser } = useAuth();
  const location = useLocation();
  
  if (currentUser) {
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }

  
  return children;
};

export default LoggedOutRoute;