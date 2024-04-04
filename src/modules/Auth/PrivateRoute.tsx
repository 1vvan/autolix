import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/shared/helpers/authHelpers';

const PrivateRoute = ({ element, ...props }) => {
  return isAuthenticated() ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
