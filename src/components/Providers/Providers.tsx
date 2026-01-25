"use client";

import "@/i18n/config"
import { SessionProvider } from "next-auth/react";
import { ReduxProvider } from "./ReduxProvider";
import { ToasterComponent, ToasterProvider } from "@gravity-ui/uikit";
import { toaster } from "@gravity-ui/uikit/toaster-singleton";
import { AuthToastHandler } from "@/features/auth/components";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ReduxProvider>
        <ToasterProvider toaster={toaster}>
          <AuthToastHandler />
          {children}
          <ToasterComponent />
        </ToasterProvider>
      </ReduxProvider>
    </SessionProvider>
  );
};
