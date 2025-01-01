import React from "react";
import Navbar from "../../components/Navbar/NavBarPage";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";

function Errands() {
  return (
    <>
      {/* {user.userType} */}
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Errands;
