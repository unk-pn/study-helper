"use client";

import c from "./RecoveryForm.module.css";
import { Button, Card, PinInput, TextInput, Icon } from "@gravity-ui/uikit";
import Link from "next/link";
import { useRecoveryForm } from "../../hooks/useRecoveryForm";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { emailRegex } from "@/lib/validations";

export const RecoveryForm = () => {
  const {
    t,
    email,
    setEmail,
    code,
    setCode,
    newPassword,
    newPasswordConfirm,
    passwordsMatch,
    step,
    loading,
    showPassword,
    setShowPassword,
    showPasswordConfirm,
    setShowPasswordConfirm,
    handleEmailSubmit,
    handleCodeSubmit,
    handlePasswordSubmit,
    handlePasswordUpdate,
    handlePasswordConfirmUpdate,
    setStep,
  } = useRecoveryForm();

  return (
    <Card className={c.card}>
      {step === 1 && (
        <>
          <form onSubmit={(e) => handleEmailSubmit(e)} className={c.form}>
            <h1 className={c.title}>{t("auth.forgotPasswordTitle")}</h1>
            <p className={c.subtitle}>{t("auth.forgotPasswordDescription")}</p>
            <TextInput
              value={email}
              placeholder="example@gmail.com"
              size="l"
              errorPlacement="inside"
              onUpdate={(val) => setEmail(val)}
              validationState={
                email && !emailRegex.test(email) ? "invalid" : undefined
              }
            />
            <Button
              view="action"
              type="submit"
              disabled={!email || !emailRegex.test(email)}
              size="l"
              width="max"
              loading={loading}
            >
              {t("auth.sendCode")}
            </Button>
            <Link href="/auth/signIn" className={c.link}>
              {t("auth.backToSignIn")}
            </Link>
          </form>
        </>
      )}
      {step === 2 && (
        <>
          <form onSubmit={(e) => handleCodeSubmit(e)} className={c.form}>
            <h1 className={c.title}>{t("auth.enterCodeTitle")}</h1>
            <p className={c.subtitle}>
              {t("auth.enterCodeDescription", { email })}
            </p>
            <PinInput size="l" value={code} length={6} onUpdate={setCode} />
            <Button
              disabled={code.length !== 6}
              type="submit"
              view="action"
              size="l"
              width="max"
              loading={loading}
            >
              {t("auth.verifyCode")}
            </Button>
            <Button view="flat" onClick={() => setStep(1)} className={c.link}>
              {t("auth.changeEmail")}
            </Button>
          </form>
        </>
      )}
      {step === 3 && (
        <>
          <form onSubmit={(e) => handlePasswordSubmit(e)} className={c.form}>
            <h1 className={c.title}>{t("auth.createNewPassword")}</h1>
            <TextInput
              placeholder="••••••••"
              value={newPassword}
              type={!showPassword ? "password" : "text"}
              size="l"
              onUpdate={(val) => handlePasswordUpdate(val)}
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
              <TextInput
                placeholder="••••••••"
                value={newPasswordConfirm}
                type={!showPasswordConfirm ? "password" : "text"}
                size="l"
                errorPlacement="inside"
                onUpdate={(val) => handlePasswordConfirmUpdate(val)}
                validationState={!passwordsMatch ? "invalid" : undefined}
                errorMessage={
                  !passwordsMatch ? t("auth.passwordsDontMatch") : undefined
                }
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
                  !newPassword || !newPasswordConfirm || !passwordsMatch
                }
                type="submit"
                view="action"
                size="l"
                width="max"
                loading={loading}
              >
                {t("auth.resetPassword")}
              </Button>
            </>
          </form>
        </>
      )}
    </Card>
  );
};
