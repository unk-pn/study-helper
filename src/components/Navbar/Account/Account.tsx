"use client";

import { Button, Popover, User } from "@gravity-ui/uikit";
import { useSession } from "next-auth/react";
import { PopoverContent } from "./PopoverContent/PopoverContent";
import { useTranslation } from "react-i18next";
import c from "./Account.module.css";

interface AccountProps {
  type: "mobile" | "desktop";
}

export const Account = ({ type }: AccountProps) => {
  const { data: session } = useSession();
  const { t } = useTranslation();

  if (!session) {
    return <Button href="/auth/signIn">{t("auth.signIn")}</Button>;
  }
  return (
    <>
      {type === "desktop" ? (
        <Popover
          placement="bottom"
          content={<PopoverContent session={session} />}
          trigger="click"
        >
          <div style={{ cursor: "pointer" }}>
            <User
              avatar={{ text: session?.user?.name?.[0] || "U", theme: "brand" }}
              size="m"
              name={session?.user?.name}
              description={session?.user?.email}
            />
          </div>
        </Popover>
      ) : (
        <div className={c.mobile}>
          <User
            avatar={{ text: session?.user?.name?.[0] || "U", theme: "brand" }}
            size="xl"
          />
          
          <div className={c.userInfo}>
            <h3>{session?.user?.name}</h3>
            <p>{session?.user?.email}</p>
          </div>
        </div>
      )}
    </>
  );
};
