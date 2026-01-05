import { Button } from "@gravity-ui/uikit";
import c from "./GuestHome.module.css";

export const GuestHome = () => {
  return (
    <main className={c.wrapper}>
      <div>
        <h1>Welcome to Study Helper!</h1>
        <h2>
          Sign in to access your personalized study materials and track your
          progress.
        </h2>
      </div>
      <Button href="/auth/signIn" size="l">
        Sign in
      </Button>
    </main>
  );
};
