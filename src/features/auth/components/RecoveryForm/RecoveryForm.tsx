"use client";

import c from "./RecoveryForm.module.css";
import { Button, Card, PinInput, TextInput, Icon } from "@gravity-ui/uikit";
import clsx from "clsx";
import Link from "next/link";
import { useRecoveryForm } from "../../hooks/useRecoveryForm";
import { Eye, EyeSlash } from "@gravity-ui/icons";

export const RecoveryForm = () => {
  const {
    email,
    setEmail,
    code,
    setCode,
    newPassword,
    newPasswordConfirm,
    passwordsMatch,
    step,
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
            <h1 className={c.title}>Forgot Password?</h1>
            <p className={c.subtitle}>
              Enter your email address and we&apos;ll send you a verification
              code
            </p>
            <TextInput
              className={clsx(c.input, c.email)}
              value={email}
              placeholder="example@gmail.com"
              size="l"
              errorPlacement="inside"
              onUpdate={(val) => setEmail(val)}
            />
            <Button
              view="action"
              type="submit"
              disabled={!email}
              size="l"
              className={c.button}
              width="max"
            >
              Send Code
            </Button>
            <Link href="/auth/signIn" className={c.link}>
              Back to Sign In
            </Link>
          </form>
        </>
      )}
      {step === 2 && (
        <>
          <form onSubmit={(e) => handleCodeSubmit(e)} className={c.form}>
            <h1 className={c.title}>Enter Verification Code</h1>
            <p className={c.subtitle}>We sent a 6-digit code to {email}</p>
            <PinInput
              size="l"
              value={code}
              length={6}
              onUpdate={setCode}
              className={c.pinInput}
            />
            <Button
              disabled={code.length !== 6}
              type="submit"
              view="action"
              size="l"
              className={c.button}
              width="max"
            >
              Verify Code
            </Button>
            <Button view="flat" onClick={() => setStep(1)} className={c.link}>
              Change email
            </Button>
          </form>
        </>
      )}
      {step === 3 && (
        <>
          <form onSubmit={(e) => handlePasswordSubmit(e)} className={c.form}>
            <h1 className={c.title}>Create New Password</h1>
            <TextInput
              className={clsx(c.input, c.password)}
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
                className={clsx(c.input, c.passwordConfirm)}
                placeholder="••••••••"
                value={newPasswordConfirm}
                type={!showPasswordConfirm ? "password" : "text"}
                size="l"
                errorPlacement="inside"
                onUpdate={(val) => handlePasswordConfirmUpdate(val)}
                validationState={!passwordsMatch ? "invalid" : undefined}
                errorMessage={
                  !passwordsMatch ? "Пароли не совпадают" : undefined
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
                className={c.button}
                width="max"
              >
                Reset Password
              </Button>
            </>
          </form>
        </>
      )}
    </Card>
  );
};
