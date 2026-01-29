import { toast } from "@/lib/toast";
import { signIn } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useSignInForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const oldEmail = localStorage.getItem("passwordChanged");

    if (oldEmail) {
      setTimeout(() => {
        toast.success(
          t("auth.toast.passwordResetSuccess"),
          t("auth.toast.passwordResetSuccessDescription", { email: oldEmail }),
        );
      });
      localStorage.removeItem("passwordChanged");
    }
  }, [t]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: email.trim(),
        password: password.trim(),
        redirect: false,
      });

      if (res?.error) {
        toast.danger(t("auth.toast.signInError"), res.error);
        return;
      }

      localStorage.setItem("justLoggedIn", email);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      if (error instanceof Error)
        toast.danger(t("auth.toast.signInError"), error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    t,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    loading,
    handleSubmit,
  };
};
