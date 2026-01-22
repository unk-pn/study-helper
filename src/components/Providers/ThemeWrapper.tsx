"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setTheme } from "@/store/slices/settingSlice";
import { ThemeProvider } from "@gravity-ui/uikit";
import { useEffect } from "react";

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useAppSelector((state) => state.settings.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window === "undefined") return; // only client side 

    const hasUserPreference = localStorage.getItem("theme");

    if (!hasUserPreference) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      dispatch(setTheme(systemTheme));
      localStorage.setItem("theme", systemTheme);
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme} rootClassName="custom-root">
      {children}
    </ThemeProvider>
  );
};
