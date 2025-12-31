import clsx from "clsx";
import c from "./Nav.module.css";

interface NavProps {
  onDontKnowClick: () => void;
  onKnowClick: () => void;
}

export const Nav = ({ onDontKnowClick, onKnowClick }: NavProps) => {
  return (
    <div className={c.nav}>
      <button className={clsx(c.button, c.dontKnow)} onClick={onDontKnowClick}>
        Не знаю
      </button>
      <button className={clsx(c.button, c.know)} onClick={onKnowClick}>
        Знаю
      </button>
    </div>
  );
};
