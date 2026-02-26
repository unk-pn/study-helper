"use client";

import { Button } from "@gravity-ui/uikit";
import { useTranslation } from "react-i18next";
import c from "./GuestHero.module.css";

export const GuestHero = () => {
  const { t } = useTranslation();

  return (
    <div className={c.hero}>
      <div className={c.content}>
        <div className={c.badge}>{t("guest.badge")}</div>
        <h1 className={c.title}>{t("guest.title")}</h1>
        <p className={c.subtitle}>{t("guest.subtitle")}</p>
        <div className={c.buttons}>
          <Button view="action" href="/auth/signUp" size="xl">
            {t("guest.getStarted")}
          </Button>
          <Button view="outlined" href="/about" size="xl">
            {t("guest.learnMore")}
          </Button>
        </div>
      </div>
    </div>
  );
};
