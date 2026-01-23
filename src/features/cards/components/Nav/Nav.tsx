import clsx from "clsx";
import c from "./Nav.module.css";
import { Button } from "@gravity-ui/uikit";
import { useTranslation } from "react-i18next";

interface NavProps {
  onDontKnowClick: () => void;
  onKnowClick: () => void;
}

export const Nav = ({ onDontKnowClick, onKnowClick }: NavProps) => {
  const { t } = useTranslation();

  return (
    <div className={c.nav}>
      <Button
        className={clsx(c.button, c.know)}
        onClick={onKnowClick}
        view="action"
        size="l"
      >
        {t("cards.know")}
      </Button>
      <Button
        className={clsx(c.button, c.dontKnow)}
        onClick={onDontKnowClick}
        size="l"
      >
        {t("cards.know")}
      </Button>
    </div>
  );
};
