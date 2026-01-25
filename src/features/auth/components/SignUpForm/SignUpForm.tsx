"use client";

import c from "./SignUpForm.module.css";
import { Button, Card, Icon, PinInput, TextInput } from "@gravity-ui/uikit";
import Link from "next/link";
import { useSignUpForm } from "../../hooks/useSignUpForm";
import { Eye, EyeSlash } from "@gravity-ui/icons";

export const SignUpForm = () => {
  const {
    t,
    name,
    setName,
    email,
    handleEmailUpdate,
    password,
    handlePasswordUpdate,
    passwordConfirm,
    handlePasswordConfirmUpdate,
    code,
    setCode,
    codeSended,
    emailValid,
    passwordsMatch,
    passwordStrong,
    showPassword,
    setShowPassword,
    showPasswordConfirm,
    setShowPasswordConfirm,
    loading,
    handleSubmit,
    handleCodeSubmit,
  } = useSignUpForm();

  return (
    <Card className={c.card}>
      {!codeSended ? (
        <form onSubmit={handleSubmit} className={c.form}>
          <h1>{t("auth.signUp")}</h1>
          <TextInput
            value={name}
            onUpdate={(val) => setName(val)}
            placeholder={t("auth.name")}
            size="l"
          />

          <TextInput
            value={email}
            placeholder="example@gmail.com"
            size="l"
            errorPlacement="inside"
            onUpdate={(val) => handleEmailUpdate(val)}
            validationState={emailValid === false ? "invalid" : undefined}
            errorMessage={
              emailValid === false ? t("auth.incorrectEmail") : undefined
            }
          />
          <TextInput
            placeholder="••••••••"
            value={password}
            type={!showPassword ? "password" : "text"}
            size="l"
            onUpdate={(val) => handlePasswordUpdate(val)}
            validationState={!passwordStrong ? "invalid" : undefined}
            errorPlacement="inside"
            errorMessage={
              !passwordStrong ? t("auth.notStrongPassword") : undefined
            }
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
          <TextInput
            placeholder="••••••••"
            value={passwordConfirm}
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
            type="submit"
            view="action"
            size="l"
            width="max"
            disabled={
              !emailValid ||
              !passwordsMatch ||
              !passwordStrong ||
              !name.trim() ||
              !password.trim()
            }
            loading={loading}
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
          <PinInput size="l" value={code} length={6} onUpdate={setCode} />
          <Button type="submit" view="action" size="l" loading={loading}>
            {t("auth.verifyCode")}
          </Button>
        </form>
      )}
    </Card>
  );
};
