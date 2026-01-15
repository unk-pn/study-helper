"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@gravity-ui/uikit";
import { Provider } from "react-redux";
import { store } from "@/store";

type Theme = "light" | "dark";
const theme: Theme = "light";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme} rootClassName="custom-root">
          {children}
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
};
