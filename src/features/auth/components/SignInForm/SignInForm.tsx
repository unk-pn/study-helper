"use client";

import c from "./SignInForm.module.css";
import { Button, Card, Icon } from "@gravity-ui/uikit";
import Link from "next/link";
import { clsx } from "clsx";
import { useSignInForm } from "./useSignInForm";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { FormTextInput } from "@/components";

export const SignInForm = () => {
  const {
    t,
    form,
    showPassword,
    setShowPassword,
    handleSubmit,
  } = useSignInForm();

  const note = (
    <Link href="/auth/forgotPassword" className={clsx(c.link, c.note)}>
      {t("auth.forgot")}
    </Link>
  );

  return (
    <Card className={c.card}>
      <form onSubmit={handleSubmit} className={c.form}>
        <h1>{t("auth.signIn")}</h1>
        <FormTextInput
          name="email"
          control={form.control}
          placeholder="example@gmail.com"
          size="l"
        />
        <FormTextInput
          name="password"
          control={form.control}
          type={!showPassword ? "password" : "text"}
          placeholder="••••••••"
          size="l"
          note={note}
          endContent={
            <Button
              onClick={() => setShowPassword(!showPassword)}
              size="s"
              view="flat-secondary"
            >
              <Icon
                data={showPassword ? Eye : EyeSlash}
                style={{ cursor: "pointer" }}
              />
            </Button>
          }
        />
        <Button
          type="submit"
          view="action"
          size="l"
          width="max"
          disabled={!form.formState.isValid}
          loading={form.formState.isSubmitting}
        >
          {t("auth.signIn")}
        </Button>
        <p>
          {t("auth.noAccount")}
          <Link href="/auth/signUp" className={c.link}>
            {t("auth.noAccountLink")}
          </Link>
        </p>
      </form>
    </Card>
  );
};
