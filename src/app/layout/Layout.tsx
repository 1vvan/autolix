import React from "react";
import { Header } from "../../modules/header/header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

export const Layout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const isMobile = window.innerWidth < 992;

  return (
    <>
        <ToastContainer
          limit={2}
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Header/>
        <div className="pt-16 wrapper w-full bg-main-mobile md:bg-main bg-cover bg-no-repeat dark:bg-dark-bg relative" style={{ minHeight: isMobile ? "1700px" : "100vh" }}>
            {children}
        </div>
    </>
  );
};
