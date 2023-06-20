import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { toast } from "react-toastify";
import { get } from "lodash";

import { Api, storage } from "services";
import { PrivateRoute, GuestRoutes } from "./routes";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { LoginFailure, LoginSuccess } from "store/action/auth";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const user = JSON.parse(storage.get("user") as string);

  const loadFetch = async () => {
    try {
      const { data } = await Api({
        url: "/myself",
        method: "GET",
        data: "",
      });
      const storageUser = JSON.stringify(get(data, "data", {}));
      storage.set("user", storageUser);

      dispatch(LoginSuccess({ ...get(data, "data") }));
    } catch (error) {
      dispatch(LoginFailure());
      window.localStorage.removeItem("user");
      toast.error(get(error, "response.data.message"));
    }
  };

  useEffect(() => {
    if (user) {
      loadFetch();
    }
    // eslint-disable-next-line
  }, [user?.key]);

  return (
    <div className="wrapper-content">
      {auth.isAuthenticated ? (
        <RouterProvider router={PrivateRoute} />
      ) : (
        <RouterProvider router={GuestRoutes} />
      )}
    </div>
  );
};

export default App;
