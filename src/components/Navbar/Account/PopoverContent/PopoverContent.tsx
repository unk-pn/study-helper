"use client";

import c from "./PopoverContent.module.css";
import { signOut } from "next-auth/react";
import { Avatar, Button, Switch } from "@gravity-ui/uikit";
import { Session } from "next-auth";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setLanguage, setTheme } from "@/store/slices/settingSlice";
import { useTranslation } from "react-i18next";

interface PopoverContentProps {
  session: Session | null;
}

export const PopoverContent = ({ session }: PopoverContentProps) => {
  const theme = useAppSelector((s) => s.settings.theme); // light | dark
  const language = useAppSelector((s) => s.settings.language); // en | ru
  const { t, i18n } = useTranslation();

  const dispatch = useAppDispatch();

  const handleThemeChange = () =>
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));

  const handleLanguageChange = () => {
    const newLang = language === "en" ? "ru" : "en";
    dispatch(setLanguage(newLang));
    i18n.changeLanguage(newLang);
  };

  return (
    <div className={c.popoverContent}>
      <Avatar size="xl" text={session?.user?.name?.[0] || "U"} theme="brand" />
      <h2>{session?.user?.name}</h2>

      <div className={c.settings}>
        <div className={c.settingsItem}>
          <p>🔆</p>
          <Switch checked={theme === "dark"} onChange={handleThemeChange} />
          <p>🌑</p>
        </div>
        <div className={c.settingsItem}>
          <p>🇷🇺</p>
          <Switch checked={language === "en"} onChange={handleLanguageChange} />
          <p>🇺🇸</p>
        </div>
      </div>

      <Button size="l" onClick={() => signOut()} className={c.signOutButton}>
        Sign out
      </Button>
    </div>
  );
};
