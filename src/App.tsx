import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './shared/assets/scss/App.scss'
import { AvailableCars } from './modules/AvailableCars/AvailableCars';
import { ROUTES } from '@/shared/constants/routes';
import { OneCar } from './modules/OneCar/OneCar';
import { isAuthenticated, useIsAdmin } from './shared/helpers/authHelpers';
import { LoginPage } from './modules/Auth/Login/Login';
import { RegisterPage } from './modules/Auth/Register/Register';
import { Clients } from './modules/Clients/Clients';
import { Sales } from './modules/Sales/Sales';
import { AllCars } from './modules/AllCars/AllCars';
import { BuyCar } from './modules/BuyCar/BuyCar';
import { UserPurchases } from './modules/UserPurchases/UserPurchases';
import { useDispatch } from 'react-redux';
import { userApi } from './app/services/userApi';
import { typesApi } from './app/services/typesApi';
import { setUser } from './app/store/reducers/UserSlice';
import { setTypesState } from './app/store/reducers/TypesSlice';
import { setCarsModelsState } from './app/store/reducers/CarsSlice';
import { Loader } from './shared/UI/loader/loader';
import { AddCar } from './modules/AddCar/AddCar';
import { EditModels } from './modules/Models/EditModels';
import { modelsApi } from './app/services/modelsApi';
import { ClientService } from './modules/Service/ClientService';
import { ServiceDashboard } from './modules/ServiceDashboard/ServiceDashboard';

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const isAdmin = useIsAdmin();

  return isAuthenticated() ? (isAdmin ? children : <Navigate to={ROUTES.cars.path} />) : <Navigate to="/login" />;
};

const HomeRoute = () => {
  const isAdmin = useIsAdmin();

  return isAdmin ? ( isAuthenticated() ?  <AllCars/> : <Navigate to="/login" /> ) :  <AvailableCars/>; 
}

function App() {
  const dispatch = useDispatch();

  const userId = localStorage.getItem('userId');
  const { data: user, isLoading: isLoadingUser } = userApi.useGetUserQuery(userId, {
    skip: !userId
  });
  const {data: types, isLoading: isLoadingTypes} = typesApi.useGetTypesQuery();
  const {data: carsModels, isLoading: isLoadingModels} = modelsApi.useGetCarsAllModelsQuery();
  
  if(user){
    dispatch(setUser(user));
  }
  if(types){
    dispatch(setTypesState(types))
  }

  useEffect(() => {
    if (carsModels) {
      dispatch(setCarsModelsState(carsModels));
    }
    // eslint-disable-next-line
  }, [carsModels])

  const isLoading = isLoadingUser || isLoadingTypes || isLoadingModels;

  if(isLoading){
    return <Loader isFull/>
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.cars.path} element={<HomeRoute/>}/>
          <Route path={ROUTES.one_car.path+'/:id'} element={<OneCar/>}/>
          <Route path={ROUTES.buy_car.path+'/:carId'} element={<PrivateRoute><BuyCar/></PrivateRoute> }/>
          <Route path={ROUTES.add_car.path} element={<PrivateRoute><AddCar/></PrivateRoute> }/>
          <Route path={ROUTES.edit_models.path} element={<PrivateRoute><EditModels/></PrivateRoute> }/>
          <Route path={ROUTES.user_purchases.path} element={<PrivateRoute><UserPurchases/></PrivateRoute> }/>
          <Route path={ROUTES.clients.path} element={<AdminRoute><Clients/></AdminRoute> }/>
          <Route path={ROUTES.sales.path} element={<AdminRoute><Sales/></AdminRoute> }/>
          <Route path={ROUTES.login.path} element={<LoginPage />} />
          <Route path={ROUTES.register.path} element={<RegisterPage />} />
          <Route path={ROUTES.client_service.path} element={<ClientService />} />
          <Route path={ROUTES.admin_service.path} element={<AdminRoute><ServiceDashboard/></AdminRoute>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
