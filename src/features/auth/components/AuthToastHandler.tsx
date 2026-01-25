"use client";

import { toast } from "@/lib/toast";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const AuthToastHandler = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const email = localStorage.getItem("justLoggedIn");
    if (email) {
      setTimeout(() => {
        toast.success(t("auth.toast.signIn", { email }));
      }, 100);
      localStorage.removeItem("justLoggedIn");
    }
  }, [t]);
  return null;
};
