"use client";

import c from "./SignUpForm.module.css";
import { Button, Card, PinInput, TextInput } from "@gravity-ui/uikit";
import Link from "next/link";
import clsx from "clsx";
import { useSignUpForm } from "../../hooks/useSignUpForm";

export const SignUpForm = () => {
  const {
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
    handleSubmit,
    handleCodeSubmit,
  } = useSignUpForm();

  return (
    <Card className={c.card}>
      {!codeSended ? (
        <form onSubmit={handleSubmit} className={c.form}>
          <h1 className={c.title}>Sign Up</h1>
          <TextInput
            className={clsx(c.input, c.name)}
            value={name}
            onUpdate={(val) => setName(val)}
            placeholder="Name"
            size="l"
          />

          <TextInput
            className={clsx(c.input, c.email)}
            value={email}
            placeholder="example@gmail.com"
            size="l"
            errorPlacement="inside"
            onUpdate={(val) => handleEmailUpdate(val)}
            validationState={emailValid === false ? "invalid" : undefined}
            errorMessage={
              emailValid === false ? "Некорректный email" : undefined
            }
          />
          <TextInput
            className={clsx(c.input, c.password)}
            placeholder="••••••••"
            value={password}
            type="password"
            size="l"
            onUpdate={(val) => handlePasswordUpdate(val)}
            validationState={!passwordStrong ? "invalid" : undefined}
            errorPlacement="inside"
            errorMessage={
              !passwordStrong
                ? "Пароль должен содержать: минимум 8 символов, заглавные и строчные буквы, цифры и спецсимволы"
                : undefined
            }
          />
          <TextInput
            className={clsx(c.input, c.passwordConfirm)}
            placeholder="••••••••"
            value={passwordConfirm}
            type="password"
            size="l"
            errorPlacement="inside"
            onUpdate={(val) => handlePasswordConfirmUpdate(val)}
            validationState={!passwordsMatch ? "invalid" : undefined}
            errorMessage={!passwordsMatch ? "Пароли не совпадают" : undefined}
          />
          <Button
            type="submit"
            view="action"
            size="l"
            className={c.button}
            width="max"
            disabled={
              !emailValid ||
              !passwordsMatch ||
              !passwordStrong ||
              !name.trim() ||
              !password.trim()
            }
          >
            Sign Up
          </Button>
          <p className={c.text}>
            Already have an account?{" "}
            <Link href="/auth/signIn" className={c.link}>
              Sign in
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleCodeSubmit} className={c.form}>
          <h1 className={c.title}>Verify Code</h1>
          <PinInput
            size="l"
            value={code}
            length={6}
            onUpdate={setCode}
            className={c.pinInput}
          />
          <Button type="submit" view="action" size="l" className={c.button}>
            Verify Code
          </Button>
        </form>
      )}
    </Card>
  );
};
