"use client";

import c from "./SignUpForm.module.css";
import { Button, Card, Icon } from "@gravity-ui/uikit";
import Link from "next/link";
import { useSignUpForm } from "./useSignUpForm";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { FormTextInput, FormPinInput } from "@/components";

export const SignUpForm = () => {
  const {
    t,
    form,
    codeSended,
    showPassword,
    setShowPassword,
    showPasswordConfirm,
    setShowPasswordConfirm,
    handleSubmit,
    handleCodeSubmit,
    isStep1Valid,
    isStep2Valid
  } = useSignUpForm();

  return (
    <Card className={c.card}>
      {!codeSended ? (
        <form onSubmit={handleSubmit} className={c.form}>
          <h1>{t("auth.signUp")}</h1>
          <FormTextInput
            name="name"
            control={form.control}
            placeholder={t("auth.name")}
            size="l"
          />

          <FormTextInput
            name="email"
            control={form.control}
            placeholder="example@gmail.com"
            size="l"
            errorPlacement="inside"
          />
          <FormTextInput
            name="password"
            control={form.control}
            placeholder="••••••••"
            type={!showPassword ? "password" : "text"}
            size="l"
            errorPlacement="inside"
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
          <FormTextInput
            name="passwordConfirm"
            control={form.control}
            placeholder="••••••••"
            type={!showPasswordConfirm ? "password" : "text"}
            size="l"
            errorPlacement="inside"
            endContent={
              <Button
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                size="s"
                view="flat-secondary"
              >
                <Icon
                  data={showPasswordConfirm ? Eye : EyeSlash}
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
            disabled={!isStep1Valid}
            loading={form.formState.isSubmitting}
          >
            {t("auth.signUp")}
          </Button>
          <p>
            {t("auth.haveAccount")}
            <Link href="/auth/signIn" className={c.link}>
              {t("auth.signIn")}
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleCodeSubmit} className={c.form}>
          <h1>{t("auth.verifyCodeTitle")}</h1>
          <FormPinInput
            name="code"
            control={form.control}
            size="l"
            length={6}
          />
          <Button
            type="submit"
            view="action"
            size="l"
            loading={form.formState.isSubmitting}
            disabled={!isStep2Valid}
          >
            {t("auth.verifyCode")}
          </Button>
        </form>
      )}
    </Card>
  );
};
