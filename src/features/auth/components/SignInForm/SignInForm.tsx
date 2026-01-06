"use client";

import c from "./SignInForm.module.css";
import { FormEvent, useState } from "react";
import { Button, Card, TextInput } from "@gravity-ui/uikit";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { clsx } from "clsx";

export const SignInForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        console.log(res?.error);
        return;
      }

      window.location.href = "/";
    } catch (error) {
      console.log(error);
      alert("error signing in");
    }
  };

  return (
    <Card className={c.card}>
      <form onSubmit={handleSubmit} className={c.form}>
        <h1 className={c.title}>Sign In</h1>
        <TextInput
          className={clsx(c.input, c.email)}
          value={email}
          onUpdate={(val) => setEmail(val)}
          placeholder="example@gmail.com"
          size="l"
        />
        <TextInput
          className={clsx(c.input, c.password)}
          placeholder="••••••••"
          value={password}
          onUpdate={(val) => setPassword(val)}
          type="password"
          size="l"
        />
        <Button
          type="submit"
          view="action"
          size="l"
          className={c.button}
          width="max"
          disabled={!email || !password}
        >
          Sign In
        </Button>
        <p className={c.text}>
          Don&apos;t have an account?{" "}
          <Link href="/auth/signUp" className={c.link}>
            Sign up
          </Link>
        </p>
      </form>
    </Card>
  );
};
