import React from "react";
import ComponentHeader from "../../components/header/header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/footer";
import AutoLoadPage from "../../components/autoLoadPage/autoLoadPage";

export default function OrderLayout() {
  return (
    <div>
      <ComponentHeader />
      <AutoLoadPage/>
      <div id="layout_oder">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
}
