import { toast } from "@/lib/toast";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

export const useRecoveryForm = () => {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string[]>([]);
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch("/api/change-password/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });
      const body = await res.json();
      if (!res.ok) {
        console.log(body.error);
        toast.danger(body.error === "User not found" ? t("auth.toast.userNotFound") : t("utils.toast.unknownError"), body.error);
        return;
      }

      setStep(2);
    } catch (error) {
      console.log("error sending recovery code: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch("/api/change-password/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          code: code.join(""),
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
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch("/api/change-password/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          code: code.join(""),
          password: newPassword.trim(),
        }),
      });
      const body = await res.json();
      if (!res.ok) {
        console.log(body.error);
        return;
      }

      localStorage.setItem("passwordChanged", email);

      window.location.href = "/auth/signIn";
    } catch (error) {
      console.log("error resetting password: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = (pass: string) => {
    setNewPassword(pass);
    setPasswordsMatch(
      !pass || !newPasswordConfirm || pass === newPasswordConfirm,
    );
  };

  const handlePasswordConfirmUpdate = (pass: string) => {
    setNewPasswordConfirm(pass);
    setPasswordsMatch(!pass || !newPassword || pass === newPassword);
  };

  return {
    t,
    email,
    setEmail,
    code,
    setCode,
    newPassword,
    newPasswordConfirm,
    passwordsMatch,
    step,
    loading,
    showPassword,
    setShowPassword,
    showPasswordConfirm,
    setShowPasswordConfirm,
    handleEmailSubmit,
    handleCodeSubmit,
    handlePasswordSubmit,
    handlePasswordUpdate,
    handlePasswordConfirmUpdate,
    setStep,
  };
};
