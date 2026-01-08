import { Button } from "@gravity-ui/uikit";
import c from "./GuestHero.module.css";

export const GuestHero = () => {
  return (
    <div className={c.hero}>
      <h1 className={c.title}>Learn Smarter, Not Harder</h1>
      <h2 className={c.subtitle}>
        Master any subject with interactive flashcards and smart study tools
      </h2>
      <div className={c.buttons}>
        <Button view="action" href="/auth/signUp" size="l">
          Get started for free
        </Button>
        <Button view="raised" href="/about" size="l">Learn more</Button>
      </div>
    </div>
  );
};
