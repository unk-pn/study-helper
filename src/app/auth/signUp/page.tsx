"use client";

import c from "./page.module.css";
import { SignUpForm } from "@/features/auth/components";

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUpPage = () => {
  return (
    <div className={c.container}>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
