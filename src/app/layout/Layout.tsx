import React from "react";
import { Header } from "../../shared/components/header/header";


interface LayoutProps {}

export const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  children,
}) => {
  const isMobile = window.innerWidth < 992;
  return (
    <>
        <Header/>
        <div className="pt-16 wrapper w-full bg-main-mobile md:bg-main bg-cover bg-no-repeat dark:bg-dark-bg relative" style={{ minHeight: isMobile ? "1700px" : "100vh" }}>
            {children}
        </div>
    </>
  );
};
