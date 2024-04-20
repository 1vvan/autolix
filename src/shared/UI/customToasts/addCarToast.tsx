import { ROUTES } from '@/shared/constants/routes';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const OneCarLink = ({ carId, closeToast }) => (
  <div>
    Car was added. Follow the{' '}
    <Link
      to={`${ROUTES.one_car.path}/${carId}`}
      className='text-blue-500 font-bold underline'
      onClick={closeToast}
    >
      link
    </Link>{' '}
    to see the result.
  </div>
);

export const showAddCarToast = (carId) => {
  const toastContent = ({ closeToast }) => (
    <OneCarLink carId={carId} closeToast={closeToast} />
  );

  toast.success(toastContent, {
    autoClose: 5000,
    closeButton: true,
    closeOnClick: false,
    draggable: true,
  });
};
