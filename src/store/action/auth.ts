import { IUser } from "type";

export enum ActionType {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
}

export type TLoginSuccess = {
  type: string;
  payload: IUser;
};
export type TLoginFailure = {
  type: string;
};

const LoginFailure = (): TLoginFailure => ({ type: ActionType.LOGIN_FAILURE });

const LoginSuccess = (data: IUser): TLoginSuccess => ({
  type: ActionType.LOGIN_SUCCESS,
  payload: data,
});

export { LoginSuccess, LoginFailure };
