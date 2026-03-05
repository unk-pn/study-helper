"use client";

import c from "./RecoveryForm.module.css";
import { Button, Card, Icon } from "@gravity-ui/uikit";
import Link from "next/link";
import { useRecoveryForm } from "./useRecoveryForm";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { FormPinInput, FormTextInput } from "@/components";

export const RecoveryForm = () => {
  const {
    t,
    form,
    step,
    showPassword,
    setShowPassword,
    showPasswordConfirm,
    setShowPasswordConfirm,
    handleEmailSubmit,
    handleCodeSubmit,
    handlePasswordSubmit,
    setStep,
  } = useRecoveryForm();

  return (
    <Card className={c.card}>
      {step === 1 && (
        <form onSubmit={handleEmailSubmit} className={c.form}>
          <h1 className={c.title}>{t("auth.forgotPasswordTitle")}</h1>
          <p className={c.subtitle}>{t("auth.forgotPasswordDescription")}</p>
          <FormTextInput
            name="email"
            control={form.control}
            placeholder="example@gmail.com"
            size="l"
            errorPlacement="inside"
            type="email"
          />
          <Button
            view="action"
            type="submit"
            disabled={!!form.formState.errors.email || !form.getValues("email")}
            size="l"
            width="max"
            loading={form.formState.isSubmitting}
          >
            {t("auth.sendCode")}
          </Button>
          <Link href="/auth/signIn" className={c.link}>
            {t("auth.backToSignIn")}
          </Link>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleCodeSubmit} className={c.form}>
          <h1 className={c.title}>{t("auth.enterCodeTitle")}</h1>
          <p className={c.subtitle}>
            {t("auth.enterCodeDescription", { email: form.getValues("email") })}
          </p>
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
            width="max"
            loading={form.formState.isSubmitting}
            disabled={!!form.formState.errors.code || !form.getValues("code")}
          >
            {t("auth.verifyCode")}
          </Button>
          <Button view="flat" onClick={() => setStep(1)} className={c.link}>
            {t("auth.changeEmail")}
          </Button>
        </form>
      )}
      {step === 3 && (
        <form onSubmit={handlePasswordSubmit} className={c.form}>
          <h1 className={c.title}>{t("auth.createNewPassword")}</h1>
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
          <>
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
              disabled={
                !!form.formState.errors.password ||
                !!form.formState.errors.passwordConfirm || 
                !form.watch("password") ||
                !form.watch("passwordConfirm")
              }
              type="submit"
              view="action"
              size="l"
              width="max"
              loading={form.formState.isSubmitting}
            >
              {t("auth.resetPassword")}
            </Button>
          </>
        </form>
      )}
    </Card>
  );
};
