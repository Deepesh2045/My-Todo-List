import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Component/Header";
import CustomSnackbar from "../Component/CustomSnackbar";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <CustomSnackbar/>
    </>
  );
};

export default MainLayout;
