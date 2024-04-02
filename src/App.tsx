import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './shared/assets/scss/App.scss'
import { AvailableCars } from './modules/AvailableCars/AvailableCars';
import { ROUTES } from '@/shared/constants/routes';
import { OneCar } from './modules/OneCar/OneCar';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.available_cars.path} element={<AvailableCars/> }/>
          <Route path={ROUTES.one_car.path+'/:id'} element={<OneCar/> }/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
