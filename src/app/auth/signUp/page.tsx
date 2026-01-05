"use client";

import { FormEvent, useState } from "react";
import c from "./page.module.css";
import { signIn } from "next-auth/react";
import { Button, PinInput, TextInput } from "@gravity-ui/uikit";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUpPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [code, setCode] = useState<string[]>([]);
  const [codeSended, setCodeSended] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const onFirstSubmit = async (
    e: React.MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
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

  const onCodeSubmit = async (
    e: React.MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
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

  const handlePasswordsUpdate = (pass: string, confirmPass: string) => {
    setPassword(pass);
    setPasswordConfirm(confirmPass);
    setPasswordsMatch(pass === confirmPass || (!pass && !confirmPass));
  };

  return (
    <div className={c.wrapper}>
      {!codeSended ? (
        <form
          className={c.form}
          // onSubmit={onFirstSubmit}
        >
          <h1 className={c.title}>Sign Up</h1>
          <TextInput
            type="text"
            placeholder="name"
            className={c.name}
            value={name}
            onUpdate={(val) => setName(val)}
          />
          <TextInput
            type="email"
            placeholder="example@gmail.com"
            className={c.email}
            value={email}
            onUpdate={(val) => handleEmailUpdate(val)}
            validationState={emailValid === false ? "invalid" : undefined}
            errorMessage={
              emailValid === false ? "Некорректный email" : undefined
            }
          />
          <TextInput
            type="password"
            placeholder="password"
            className={c.password}
            value={password}
            onUpdate={(val) => handlePasswordsUpdate(val, passwordConfirm)}
            validationState={!passwordsMatch ? "invalid" : undefined}
            errorMessage={!passwordsMatch ? "Пароли не совпадают" : undefined}
          />
          <TextInput
            type="password"
            placeholder="confirm password"
            className={c.password}
            value={passwordConfirm}
            onUpdate={(val) => handlePasswordsUpdate(password, val)}
            validationState={!passwordsMatch ? "invalid" : undefined}
            errorMessage={!passwordsMatch ? "Пароли не совпадают" : undefined}
          />
          <Button
            size="l"
            className={c.button}
            view="action"
            onClick={onFirstSubmit}
            disabled={!emailValid || !passwordsMatch || !name.trim()}
          >
            Send code
          </Button>
        </form>
      ) : (
        <form className={c.codeWrapper} onSubmit={onCodeSubmit}>
          <h1>Код верификации был отправлен на {email}.</h1>
          <PinInput size="l" value={code} length={6} onUpdate={setCode} />
          <Button onClick={onCodeSubmit} className={c.button}>
            Register
          </Button>
        </form>
      )}
    </div>
  );
};

export default SignUpPage;
