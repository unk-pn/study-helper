import { FormEvent, useState } from "react";

export const useRecoveryForm = () => {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string[]>([]);
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/change-password/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const body = await res.json();
      if (!res.ok) {
        console.log(body.error);
        return;
      }

      setStep(2);
    } catch (error) {
      console.log("error sending recovery code: ", error);
    }
  };

  const handleCodeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/change-password/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: code.join("") }),
      });
      const body = await res.json();
      if (!res.ok) {
        console.log(body.error);
        return;
      }

      setStep(3);
    } catch (error) {
      console.log("error checking code code: ", error);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/change-password/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: code.join(""),
          password: newPassword,
        }),
      });
      const body = await res.json();
      if (!res.ok) {
        console.log(body.error);
        return;
      }

      window.location.href = "/auth/signIn";
    } catch (error) {
      console.log("error resetting password: ", error);
    }
  };

  const handlePasswordUpdate = (pass: string) => {
    setNewPassword(pass);
    setPasswordsMatch(
      !pass || !newPasswordConfirm || pass === newPasswordConfirm
    );
  };

  const handlePasswordConfirmUpdate = (pass: string) => {
    setNewPasswordConfirm(pass);
    setPasswordsMatch(!pass || !newPassword || pass === newPassword);
  };

  return {
    email,
    setEmail,
    code,
    setCode,
    newPassword,
    newPasswordConfirm,
    passwordsMatch,
    step,
    handleEmailSubmit,
    handleCodeSubmit,
    handlePasswordSubmit,
    handlePasswordUpdate,
    handlePasswordConfirmUpdate,
    setStep,
  };
};
