"use client";

import "@/i18n/config"
import { SessionProvider } from "next-auth/react";
import { ReduxProvider } from "./ReduxProvider";
import { Toaster, ToasterComponent, ToasterProvider } from "@gravity-ui/uikit";

const toaster = new Toaster()

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ReduxProvider>
        <ToasterProvider toaster={toaster}>
          {children}
          <ToasterComponent />
        </ToasterProvider>
      </ReduxProvider>
    </SessionProvider>
  );
};
