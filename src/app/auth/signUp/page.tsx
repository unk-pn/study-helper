"use client";

import { FormEvent, useState } from "react";
import c from "./page.module.css";
import { signIn } from "next-auth/react";
import { PinInput } from "@gravity-ui/uikit";

const SignUpPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState<string[]>([]);
  const [codeSended, setCodeSended] = useState<boolean>(false);

  const onFirstSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  const onCodeSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  return (
    <div className={c.wrapper}>
      <form className={c.form} onSubmit={onFirstSubmit}>
        <h1 className={c.title}>Sign Up</h1>
        <input
          type="text"
          placeholder="name"
          className={c.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="example@gmail.com"
          className={c.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          className={c.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={c.button}>Send code</button>
      </form>
      {codeSended && (
        <form className={c.codeWrapper} onSubmit={onCodeSubmit}>
          {/* <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          /> */}
          <PinInput size="l" value={code} length={6} onUpdate={setCode} />
          <button className={c.button}>Register</button>
        </form>
      )}
    </div>
  );
};

export default SignUpPage;
