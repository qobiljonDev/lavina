import { AnyAction } from "redux";

import { storage } from "services";
import { ActionType } from "store/action/auth";
import { IUser } from "type";

interface State {
  isFetched: boolean;
  isAuthenticated: boolean;
  user: IUser | {};
}

const user = storage.get("user");

const initialState: State = {
  isFetched: true,
  isAuthenticated: !!user,
  user: {},
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.LOGIN_SUCCESS: {
      return {
        ...state,
        isFetched: true,
        isAuthenticated: true,
        user: action.payload,
      };
    }
    case ActionType.LOGIN_FAILURE:
      return {
        ...state,
        isFetched: true,
        isAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
};
