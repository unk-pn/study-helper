"use client";

import c from "./SignUpForm.module.css";
import { FormEvent, useState } from "react";
import { Button, Card, PinInput, TextInput } from "@gravity-ui/uikit";
import { signIn } from "next-auth/react";
import Link from "next/link";
import clsx from "clsx";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$/;

export const SignUpForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [code, setCode] = useState<string[]>([]);
  const [codeSended, setCodeSended] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [passwordStrong, setPasswordStrong] = useState<boolean>(true);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.error);
        return;
      }

      setCodeSended(true);
    } catch (error) {
      console.log(error);
      alert("error signing up");
    }
  };

  const handleCodeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: code.join(""),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.error);
        return;
      }

      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInRes?.error) {
        console.log(signInRes.error);
        alert(
          "Verification successful, but login failed. Please sign in manually."
        );

        window.location.href = "/auth/signIn";
        return;
      }

      window.location.href = "/";
    } catch (error) {
      console.log(error);
      alert("error checking code");
    }
  };

  const handleEmailUpdate = (str: string) => {
    setEmail(str);
    setEmailValid(!str || emailRegex.test(str));
  };

  const handlePasswordUpdate = (pass: string) => {
    setPassword(pass);
    setPasswordStrong(!pass || strongPasswordRegex.test(pass));
    setPasswordsMatch(!pass || !passwordConfirm || pass === passwordConfirm);
  };

  const handlePasswordConfirmUpdate = (pass: string) => {
    setPasswordConfirm(pass);
    setPasswordsMatch(!pass || !password || pass === password);
  };

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
