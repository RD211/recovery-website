// src/components/PrivateRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
  path: string;
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("PrivateRoute: authenticated: ", authenticated)

  return authenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
