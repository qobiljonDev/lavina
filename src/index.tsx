import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Spinner } from "components";
import { subscribe } from "services/api";
import { store } from "store";
import App from "./App";

import "react-toastify/dist/ReactToastify.css";
import "assets/styles/main.scss";

const appRoot = document.getElementById("root") as HTMLElement;
const root = createRoot(appRoot);

store.subscribe(() => {
  subscribe(store);
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Suspense fallback={<Spinner position="full" />}>
        <App />
        <ToastContainer
          style={{ zIndex: "100001" }}
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
      </Suspense>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
