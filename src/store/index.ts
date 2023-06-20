import { createStore, combineReducers } from "redux";

import auth from "store/reducer/auth";

const allReducers = combineReducers({
  auth: auth,
});

// const logger: Middleware =
//   ({ getState }) =>
//   (next) =>
//   (action) => {
//     console.log("will dispatch", action);

//     const returnValue = next(action);

//     console.log("state after dispatch", getState());

//     return returnValue;
//   };

export const store = createStore(
  allReducers
  // applyMiddleware(logger)
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
