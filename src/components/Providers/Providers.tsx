"use client";

import "@/i18n/config"
import { SessionProvider } from "next-auth/react";
import { ReduxProvider } from "./ReduxProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </SessionProvider>
  );
};
