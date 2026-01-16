"use client";

import { useAppSelector } from "@/hooks/redux";
import { ThemeProvider } from "@gravity-ui/uikit";

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useAppSelector((state) => state.settings.theme);

  return (
    <ThemeProvider theme={theme} rootClassName="custom-root">
      {children}
    </ThemeProvider>
  );
};
