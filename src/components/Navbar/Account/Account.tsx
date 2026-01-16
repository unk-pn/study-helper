"use client";

import { Button, Popover, User } from "@gravity-ui/uikit";
import { useSession } from "next-auth/react";
import { PopoverContent } from "./PopoverContent/PopoverContent";

export const Account = () => {
  const { data: session } = useSession();

  if (!session) {
    return <Button href="/auth/signIn">Log in</Button>;
  }
  return (
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
  );
};
