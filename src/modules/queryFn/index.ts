import { AxiosResponse, Method } from "axios";
import { get, isArray } from "lodash";
import { Api } from "services";
import { TKey } from "modules/_module";
import { TParams } from "type";

interface QueryFn {
  url: string;
  metaKey: TKey;
  dataKey: TKey;
  headers?: object;
  method?: Method;
  params?: Partial<TParams>;
}

async function queryFn({
  url,
  dataKey = "data",
  metaKey = "meta",
  headers,
  method = "GET",
  params = {},
}: QueryFn): Promise<any> {
  const { data }: AxiosResponse = await Api({
    url,
    method,
    data: "",
    params,
    headers,
  });

  let response = data;

  if (!isArray(data)) {
    response = {
      data: typeof dataKey === "function" ? dataKey(data) : get(data, dataKey),
      meta: typeof metaKey === "function" ? metaKey(data) : get(data, metaKey),
    };
  }
  return response;
}

export { queryFn };
