import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './shared/assets/scss/App.scss'
import { AvailableCars } from './modules/AvailableCars/AvailableCars';
import { ROUTES } from '@/shared/constants/routes';
import { OneCar } from './shared/components/OneCar/OneCar';
import { isAuthenticated, useIsAdmin } from './shared/helpers/authHelpers';
import { LoginPage } from './modules/Auth/Login/Login';
import { RegisterPage } from './modules/Auth/Register/Register';
import { Clients } from './modules/Clients/Clients';
import { Sales } from './modules/Sales/Sales';

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const isAdmin = useIsAdmin();

  return isAdmin ? children : <Navigate to={ROUTES.available_cars.path} replace />;
};

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.available_cars.path} element={<PrivateRoute><AvailableCars/></PrivateRoute>}/>
          <Route path={ROUTES.one_car.path+'/:id'} element={<PrivateRoute><OneCar/></PrivateRoute> }/>
          <Route path={ROUTES.one_car.path+'/:id'} element={<PrivateRoute><OneCar/></PrivateRoute> }/>
          <Route path={ROUTES.clients.path} element={<AdminRoute><Clients/></AdminRoute> }/>
          <Route path={ROUTES.sales.path} element={<AdminRoute><Sales/></AdminRoute> }/>
          <Route path={ROUTES.login.path} element={<LoginPage />} />
          <Route path={ROUTES.register.path} element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
