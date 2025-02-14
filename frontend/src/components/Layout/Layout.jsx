import React from "react";
import Header from "../Header/Header";
import Routers from "../../routers/Routers";
import { useAuth } from "../../contexts/AuthContext";
const Layout = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {!isLoggedIn && <Header />}
      <Routers />
    </>
  );
};

export default Layout;
