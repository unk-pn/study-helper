import { combineReducers, configureStore } from "@reduxjs/toolkit";

const RootReducer = combineReducers({});

const setupStore = () => {
  return configureStore({
    reducer: RootReducer,
  });
};

export type RootState = ReturnType<typeof RootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const store = setupStore();
