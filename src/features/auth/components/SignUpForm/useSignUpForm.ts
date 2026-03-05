import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "@/lib/toast";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { SignUpFormData, signUpFormSchema } from "@/lib/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

export const useSignUpForm = () => {
  const [codeSended, setCodeSended] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const { t } = useTranslation();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      code: [],
    },
  });

  const handleSubmit = form.handleSubmit(async (zData) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: zData.name.trim(),
          email: zData.email.trim(),
          password: zData.password.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.error);
        toast.danger(t("auth.toast.signUpError"), data.error);
        return;
      }

      setCodeSended(true);
    } catch {
      toast.danger(t("auth.toast.signUpError"));
    }
  });

  const handleCodeSubmit = form.handleSubmit(async (zData) => {
    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: zData.email.trim(),
          code: zData.code.join(""),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.error);
        toast.danger(t("auth.toast.codeError"), data.error);
        return;
      }

      const signInRes = await signIn("credentials", {
        email: zData.email.trim(),
        password: zData.password.trim(),
        redirect: false,
      });

      if (signInRes?.error) {
        console.log(signInRes.error);
        toast.warning(t("auth.toast.signUpResError"));

        window.location.href = "/auth/signIn";
        return;
      }

      window.location.href = "/";
    } catch {
      toast.danger(t("auth.toast.codeError"));
    }
  });

  const isStep1Valid =
    !form.formState.errors.name &&
    !form.formState.errors.email &&
    !form.formState.errors.password &&
    !form.formState.errors.passwordConfirm;

  const isStep2Valid = form.watch("code").length === 6;

  return {
    t,
    form,
    codeSended,
    showPassword,
    setShowPassword,
    showPasswordConfirm,
    setShowPasswordConfirm,
    handleSubmit,
    handleCodeSubmit,
    isStep1Valid,
    isStep2Valid,
  };
};
