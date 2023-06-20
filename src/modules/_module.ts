export type TKey = string | Function;

export type TUseRequest<T, K extends keyof T> = Partial<T> & Pick<T, K>;

type TQueryKey = Array<string | number | object>;
type TData = object | object[];

interface IRequest {
  url: string;
  urlSearchParams: Object;
}

interface IPutRequest extends IRequest {
  id: number;
  queryKey: TQueryKey;
  data: TData;
}

interface IPostRequest extends IRequest {
  data: Object;
}

interface IDeleteRequest extends IRequest {
  id: number;
  queryKey: TQueryKey;
}

export type { IPutRequest, IPostRequest, IDeleteRequest };
