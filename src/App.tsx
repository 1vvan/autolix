import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './shared/assets/scss/App.scss'
import { AvailableCars } from './modules/AvailableCars/AvailableCars';
import { ROUTES } from '@/shared/constants/routes';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.available_cars.path} element={<AvailableCars/> }/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
