import clsx from "clsx";
import c from "./Nav.module.css";
import { Button } from "@gravity-ui/uikit";

interface NavProps {
  onDontKnowClick: () => void;
  onKnowClick: () => void;
}

export const Nav = ({ onDontKnowClick, onKnowClick }: NavProps) => {
  return (
    <div className={c.nav}>
      <Button
        className={clsx(c.button, c.dontKnow)}
        onClick={onDontKnowClick}
        size="l"
      >
        Не знаю
      </Button>
      <Button 
        className={clsx(c.button, c.know)}
        onClick={onKnowClick} 
        size="l"
      >
        Знаю
      </Button>
    </div>
  );
};
