import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Spinner } from "components";
import Sidebar from "./Sidebar";

import "./style.scss";

const Index = () => {
  return (
    <div className="layout-page">
      <Sidebar />
      <div className="main-page pos-relative">
        <Suspense fallback={<Spinner position="absolute" />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Index;
