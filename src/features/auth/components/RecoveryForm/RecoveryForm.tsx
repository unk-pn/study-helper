"use client";

import { FormEvent, useState } from "react";
import c from "./RecoveryForm.module.css";
import { Button, Card, PinInput, TextInput } from "@gravity-ui/uikit";
import clsx from "clsx";
import Link from "next/link";

export const RecoveryForm = () => {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string[]>([]);
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/change-password/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const body = await res.json();
      if (!res.ok) {
        console.log(body.error);
        return;
      }

      setStep(2);
    } catch (error) {
      console.log("error sending recovery code: ", error);
    }
  };

  const handleCodeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/change-password/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: code.join("") }),
      });
      const body = await res.json();
      if (!res.ok) {
        console.log(body.error);
        return;
      }

      setStep(3);
    } catch (error) {
      console.log("error checking code code: ", error);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/change-password/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: code.join(""),
          password: newPassword,
        }),
      });
      const body = await res.json();
      if (!res.ok) {
        console.log(body.error);
        return;
      }

      window.location.href = "/auth/signIn";
    } catch (error) {
      console.log("error resetting password: ", error);
    }
  };

  const handlePasswordUpdate = (pass: string) => {
    setNewPassword(pass);
    setPasswordsMatch(
      !pass || !newPasswordConfirm || pass === newPasswordConfirm
    );
  };

  const handlePasswordConfirmUpdate = (pass: string) => {
    setNewPasswordConfirm(pass);
    setPasswordsMatch(!pass || !newPassword || pass === newPassword);
  };

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
              type="password"
              size="l"
              onUpdate={(val) => handlePasswordUpdate(val)}
              errorPlacement="inside"
            />
            <TextInput
              className={clsx(c.input, c.passwordConfirm)}
              placeholder="••••••••"
              value={newPasswordConfirm}
              type="password"
              size="l"
              errorPlacement="inside"
              onUpdate={(val) => handlePasswordConfirmUpdate(val)}
              validationState={!passwordsMatch ? "invalid" : undefined}
              errorMessage={!passwordsMatch ? "Пароли не совпадают" : undefined}
            />
            <Button
              disabled={!newPassword || !newPasswordConfirm || !passwordsMatch}
              type="submit"
              view="action"
              size="l"
              className={c.button}
              width="max"
            >
              Reset Password
            </Button>
          </form>
        </>
      )}
    </Card>
  );
};
