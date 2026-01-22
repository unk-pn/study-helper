"use client";

import c from "./SignInForm.module.css";
import { Button, Card, Icon, TextInput } from "@gravity-ui/uikit";
import Link from "next/link";
import { clsx } from "clsx";
import { useSignInForm } from "../../hooks/useSignInForm";
import { Eye, EyeSlash } from "@gravity-ui/icons";

const note = (
  <Link href="/auth/forgotPassword" className={clsx(c.link, c.note)}>
    Forgot password?
  </Link>
);

export const SignInForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleSubmit,
  } = useSignInForm();

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
          type={!showPassword ? "password" : "text"}
          size="l"
          note={note}
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
