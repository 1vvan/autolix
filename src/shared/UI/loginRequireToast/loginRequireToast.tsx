import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginLink = ({ closeToast }) => (
  <div>
    Please <Link to="/login" className='text-blue-500 font-bold underline' onClick={closeToast}>log in</Link> to proceed with the purchase.
  </div>
);

export const showLoginToast = () => {
  toast.warning(toastContent, {
    autoClose: 5000,
    closeButton: true,
    closeOnClick: false,
    draggable: true,
  });
};

const toastContent = ({ closeToast }) => (
  <LoginLink closeToast={closeToast} />
);
