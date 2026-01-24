"use client";

import c from "./PopoverContent.module.css";
import { signOut } from "next-auth/react";
import { Avatar, Button } from "@gravity-ui/uikit";
import { Session } from "next-auth";
import { useTranslation } from "react-i18next";
import { Settings } from "../../Settings/Settings";

interface PopoverContentProps {
  session: Session | null;
}

export const PopoverContent = ({ session }: PopoverContentProps) => {
    const { t } = useTranslation();


  return (
    <div className={c.popoverContent}>
      <Avatar size="xl" text={session?.user?.name?.[0] || "U"} theme="brand" />
      <h2>{session?.user?.name}</h2>

     <Settings />

      <Button size="l" onClick={() => signOut()} className={c.signOutButton}>
        {t("auth.signOut")}
      </Button>
    </div>
  );
};
