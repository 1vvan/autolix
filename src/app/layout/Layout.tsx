import React from "react";
import { Header } from "../../modules/header/header";
import { userApi } from "../services/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../store/reducers/UserSlice";
import { Loader } from "@/shared/UI/loader/loader";
import { typesApi } from "../services/typesApi";
import { setTypesState } from "../store/reducers/TypesSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';


interface LayoutProps {}

export const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  children,
}) => {
  const isMobile = window.innerWidth < 992;
  const dispatch = useDispatch();

  const userId = localStorage.getItem('userId');
  const { data: user, isLoading: isLoadingUser } = userApi.useGetUserQuery(userId, {
    skip: !userId
  });
  const {data: types} = typesApi.useGetTypesQuery();
  if(user){
    dispatch(setUser(user));
  }
  if(types){
    dispatch(setTypesState(types))
  }

  if(isLoadingUser){
    return <Loader isFull/>
  }

  return (
    <>
        <ToastContainer
          limit={2}
          position="top-right"
          autoClose={5000}
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
