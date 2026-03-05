import { RecoveryFormData, recoveryFormSchema } from "@/lib/formSchemas";
import { toast } from "@/lib/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const useRecoveryForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const { t } = useTranslation();

  const form = useForm<RecoveryFormData>({
    resolver: zodResolver(recoveryFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      code: [],
      password: "",
      passwordConfirm: "",
    },
  });

  const handleEmailSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/change-password/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email.trim() }),
      });
      const body = await res.json();
      if (!res.ok) {
        console.log(body.error);
        toast.danger(
          body.error === "User not found"
            ? t("auth.toast.userNotFound")
            : t("utils.toast.unknownError"),
          body.error,
        );
        return;
      }

      setStep(2);
    } catch (error) {
      console.log("error sending recovery code: ", error);
    }
  });

  const handleCodeSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/change-password/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email.trim(),
          code: data.code.join(""),
        }),
      });
      const body = await res.json();

      if (!res.ok) {
        console.log(body.error);
        toast.danger(t("auth.toast.codeError"), body.error);
        return;
      }

      setStep(3);
    } catch (error) {
      console.log("error checking code code: ", error);
      if (error instanceof Error)
        toast.danger(t("auth.toast.codeError"), error.message);
    }
  });

  const handlePasswordSubmit = form.handleSubmit(async (data) => {
    try {
      const res = await fetch("/api/change-password/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email.trim(),
          code: data.code.join(""),
          password: data.password.trim(),
        }),
      });
      const body = await res.json();
      if (!res.ok) {
        console.log(body.error);
        return;
      }

      localStorage.setItem("passwordChanged", data.email);

      window.location.href = "/auth/signIn";
    } catch (error) {
      console.log("error resetting password: ", error);
    }
  })

  return {
    t,
    form,
    step,
    showPassword,
    setShowPassword,
    showPasswordConfirm,
    setShowPasswordConfirm,
    handleEmailSubmit,
    handleCodeSubmit,
    handlePasswordSubmit,
    setStep,
  };
};
