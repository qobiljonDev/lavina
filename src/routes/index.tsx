import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

import Auth from "pages/Auth";
import Layout from "Layout";

const Books = lazy(() => import("pages/Books"));

export const PrivateRoute = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Books />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export const GuestRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default {
  PrivateRoute,
  GuestRoutes,
};
