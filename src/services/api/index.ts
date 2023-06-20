import axios, { AxiosRequestConfig } from "axios";
import QueryString from "qs";

import { errorHandler } from "./errorHandler";
import { TParams } from "../../type";
import { get } from "lodash";
import helpers from "services/helpers";
import storage from "services/storage";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
});

let user = JSON.parse(storage.get("user") as string);

export const subscribe = (store: any) => {
  let state = store.getState();
  if (get(state, "auth.user")) user = get(state, "auth.user");
};

const createExtraParams = (config: AxiosRequestConfig): string => {
  const url: string = get(config, "url", "");

  let params: Partial<TParams> = get(config, "params", {});

  if (params.hasOwnProperty("extra")) {
    const extra: Object = get(params, "extra", {});

    params = {
      ...params,
      ...(extra || {}),
      extra: undefined,
    };
  }
  return `${url}${
    Object.keys(params).length ? "?" + QueryString.stringify(params) : ""
  }`;
};

api.interceptors.request.use(
  (config: any) => {
    const { method, url, data = "" } = config;

    const signIn = helpers.calculateHeaders(method, url, data);

    return {
      ...config,
      url: createExtraParams(config),
      params: {},
      headers: {
        ...signIn,
        ...config.headers,
      },
    };
  },
  (error) => {
    return error;
  }
);

api.interceptors.response.use(
  (response) => {
    errorHandler(response);
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
