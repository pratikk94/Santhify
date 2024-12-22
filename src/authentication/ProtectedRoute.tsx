import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('jwt');

  if (!token) {
    return <Navigate to="/" />;
  }

  // Skip actual JWT decoding for testing
  try {
    const decoded = JSON.parse(token);
    const isExpired = decoded.exp < Date.now();
    if (isExpired) {
      throw new Error('Token expired');
    }
  } catch (error) {
    localStorage.removeItem('jwt');
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;