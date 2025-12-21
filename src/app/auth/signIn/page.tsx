"use client";

import Link from "next/link";
import c from "./page.module.css";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

const SignInPage = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        console.log(res?.error)
        return
      }

      window.location.href = "/";
    } catch (error) {
      console.log(error);
      alert("error signing in");
    }
  };
  return (
    <div className={c.wrapper}>
      <form className={c.form} onSubmit={onSubmit}>
        <h1 className={c.title}>Sign In</h1>
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
          className={c.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={c.button}>sign in</button>
      </form>
      <Link href="/auth/signUp">register</Link>
    </div>
  );
};

export default SignInPage;
