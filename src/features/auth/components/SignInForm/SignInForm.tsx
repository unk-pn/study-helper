"use client";

import c from "./SignInForm.module.css";
import { Button, Card, Icon, TextInput } from "@gravity-ui/uikit";
import Link from "next/link";
import { clsx } from "clsx";
import { useSignInForm } from "../../hooks/useSignInForm";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { emailRegex } from "@/lib/validations";

export const SignInForm = () => {
  const {
    t,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    loading,
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
        <TextInput
          value={email}
          onUpdate={(val) => setEmail(val)}
          placeholder="example@gmail.com"
          size="l"
          validationState={
            email && !emailRegex.test(email) ? "invalid" : undefined
          }
        />
        <TextInput
          placeholder="••••••••"
          value={password}
          onUpdate={(val) => setPassword(val)}
          type={!showPassword ? "password" : "text"}
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
          disabled={!email || !password}
          loading={loading}
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
