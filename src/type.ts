export type TParams = {
  "per-page": number;
  page: number;
  sort: string | number;
  include: string;
  limit: number;
  extra: object;
  filter: object;
};

export interface IUser {
  id?: number;
  key: string;
  name: string;
  email: string;
  secret: string;
}
