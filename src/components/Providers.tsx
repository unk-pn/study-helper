"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@gravity-ui/uikit";

type Theme = "light" | "dark";
const theme: Theme = "light"; 

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme} rootClassName="custom-root">{children}</ThemeProvider>
    </SessionProvider>
  );
};
