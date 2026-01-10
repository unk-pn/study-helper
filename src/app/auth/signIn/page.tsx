import c from "./page.module.css";
import { SignInForm } from "@/features/auth/components";

const SignInPage = () => {
  return (
    <div className={c.container}>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
