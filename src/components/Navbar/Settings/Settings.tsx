import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import c from "./Settings.module.css";
import { useTranslation } from "react-i18next";
import { setLanguage, setTheme } from "@/store/slices/settingSlice";
import { Icon, Switch } from "@gravity-ui/uikit";
import { Moon, Sun } from "@gravity-ui/icons";

export const Settings = () => {
    const theme = useAppSelector((s) => s.settings.theme);
    const language = useAppSelector((s) => s.settings.language);
    const { i18n } = useTranslation();

    const dispatch = useAppDispatch();

    const handleThemeChange = () =>
      dispatch(setTheme(theme === "dark" ? "light" : "dark"));

    const handleLanguageChange = () => {
      const newLang = language === "en" ? "ru" : "en";
      dispatch(setLanguage(newLang));
      i18n.changeLanguage(newLang);
    };
  return (
    <div className={c.settings}>
      <div className={c.settingsItem}>
        <Icon data={Sun} />
        <Switch checked={theme === "dark"} onChange={handleThemeChange} />
        <Icon data={Moon} />
      </div>
      <div className={c.settingsItem}>
        <p>Ru</p>
        <Switch checked={language === "en"} onChange={handleLanguageChange} />
        <p>En</p>
      </div>
    </div>
  );
}