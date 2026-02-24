import { toast } from "@/lib/toast";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormData, signInFormSchema } from "@/lib/formSchemas";

export const useSignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: { email: "", password: "" },
  });

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

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await signIn("credentials", {
        email: data.email.trim(),
        password: data.password.trim(),
        redirect: false,
      });

      if (res?.error) {
        toast.danger(t("auth.toast.signInError"), res.error);
        return;
      }

      localStorage.setItem("justLoggedIn", data.email);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      if (error instanceof Error)
        toast.danger(t("auth.toast.signInError"), error.message);
    }
  });

  return {
    t,
    form,
    showPassword,
    setShowPassword,
    handleSubmit,
  };
};
