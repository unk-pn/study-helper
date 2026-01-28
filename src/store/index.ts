import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { questionsReducer, settingsReducer, subjectsReducer } from "./slices";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["settings", "subjects"],
};

export const RootReducer = combineReducers({
  settings: settingsReducer,
  subjects: subjectsReducer,
  questions: questionsReducer,
});

const persistedReducer = persistReducer(persistConfig, RootReducer);

const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

export type RootState = ReturnType<typeof RootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const store = setupStore();
export const persistor = persistStore(store);

export const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: RootReducer,
    preloadedState: initialState,
  });
};