"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@gravity-ui/uikit";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { Loader } from "./Loader";

type Theme = "light" | "dark";
const theme: Theme = "light";
const loader = <Loader />;

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={loader} persistor={persistor}>
          <ThemeProvider theme={theme} rootClassName="custom-root">
            {children}
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
};
