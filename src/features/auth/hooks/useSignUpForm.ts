import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@$!%*?&])[A-Za-z\d.@$!%*?&]{8,}$/;

export const useSignUpForm = () => {
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
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        }),
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
          email: email.trim(),
          code: code.join(""),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.error);
        return;
      }

      const signInRes = await signIn("credentials", {
        email: email.trim(),
        password: password.trim(),
        redirect: false,
      });

      if (signInRes?.error) {
        console.log(signInRes.error);
        alert(
          "Verification successful, but login failed. Please sign in manually.",
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

  return {
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
  };
};
