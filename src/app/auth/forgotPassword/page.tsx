import { RecoveryForm } from "@/features/auth/components";
import c from "./page.module.css";

export const ForgotPasswordPage = () => {
  return (
    <div className={c.container}>
      <RecoveryForm />
    </div>
  );
};

export default ForgotPasswordPage;
