import React from "react";
import { get } from "lodash";
import {
  useQuery,
  QueryFunctionContext,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import { queryFn } from "../queryFn";
import { TKey, TUseRequest } from "modules/_module";
import { TParams } from "type";

interface IOptionalRequest {
  url: string;
  metaKey: TKey;
  dataKey: TKey;
  queryKey: Required<string | Object | number>;
  params: Partial<TParams>;
  select: Function;
  onSuccess: Function;
  onError: Function;
  queryOptions: UseQueryOptions;
  children: ({
    query,
    data,
    meta,
  }: {
    meta: object;
    data: Array<object>;
    query: UseQueryResult;
  }) => React.ReactElement;
}

function All({
  url,
  select,
  onError,
  onSuccess,
  params,
  queryKey,
  dataKey = "data",
  metaKey = "meta",
  queryOptions,
  children,
}: TUseRequest<IOptionalRequest, "url" | "children">): React.ReactElement {
  const query: UseQueryResult = useQuery({
    queryKey: [queryKey ? queryKey : url],
    queryFn: async (context: QueryFunctionContext) =>
      queryFn({
        url,
        dataKey,
        metaKey,
        params,
      }),
    ...queryOptions,
    select: (data) => (typeof select === "function" ? select(data) : data),
    onSuccess: () => (typeof onSuccess === "function" ? onSuccess() : null),
    onError: () => (typeof onError === "function" ? onError() : null),
  });

  const data = get(query, "data.data", []);
  const meta = get(query, "data.meta", {});

  return children({ query, data, meta });
}

export default All;
