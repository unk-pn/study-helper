import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export const useSignInForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: email.trim(),
        password: password.trim(),
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

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  };
};
