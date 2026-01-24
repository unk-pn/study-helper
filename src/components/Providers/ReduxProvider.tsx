"use client";

import { Provider } from "react-redux";
import { ThemeWrapper } from "./ThemeWrapper";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { Loader } from "..";

const loader = <Loader />;

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={loader} persistor={persistor}>
        <ThemeWrapper>{children}</ThemeWrapper>
      </PersistGate>
    </Provider>
  );
};
