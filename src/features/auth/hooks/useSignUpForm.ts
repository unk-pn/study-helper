import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "@/lib/toast";
import { useTranslation } from "react-i18next";
import { emailRegex, strongPasswordRegex } from "@/lib/validations";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
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
        toast.danger(t("auth.toast.signUpError"), data.error);
        return;
      }

      setCodeSended(true);
    } catch (error) {
      console.log(error);
      toast.danger(
        t("auth.toast.signUpError"),
        t("utils.toast.errorDescription", { code: "CHANGE ME" }),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
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
        toast.danger(t("auth.toast.codeError"), data.error);
        return;
      }

      const signInRes = await signIn("credentials", {
        email: email.trim(),
        password: password.trim(),
        redirect: false,
      });

      if (signInRes?.error) {
        console.log(signInRes.error);
        toast.warning(t("auth.toast.signUpResError"));

        window.location.href = "/auth/signIn";
        return;
      }

      window.location.href = "/";
    } catch (error) {
      console.log(error);
      alert("error checking code");
    } finally {
      setLoading(false);
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
    t,
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
    showPassword,
    setShowPassword,
    showPasswordConfirm,
    setShowPasswordConfirm,
    loading,
    handleSubmit,
    handleCodeSubmit,
  };
};
