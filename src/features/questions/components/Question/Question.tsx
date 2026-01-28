import { Card, DropdownMenu } from "@gravity-ui/uikit";
import c from "./Question.module.css";
import { PencilToLine, TrashBin } from "@gravity-ui/icons";
import { Spoiler } from "spoiled";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks/redux";

interface QuestionProps {
  id: string;
  name: string;
  answer: string | null;
  index?: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const Question = ({
  id,
  name,
  answer,
  index,
  onEdit,
  onDelete,
}: QuestionProps) => {
  const indx = index !== undefined ? index + 1 : "";
  const theme = useAppSelector((s) => s.settings.theme);
  const { t } = useTranslation();

  return (
    <Card className={c.question}>
      {indx && <h2 className={c.index}>{indx}.</h2>}
      <div className={c.content}>
        <h2>{name}</h2>
        <Spoiler revealOn="click" theme={theme}>
          <pre className={c.answer}>{answer || t("questions.noAnswer")}</pre>
        </Spoiler>
      </div>
      <DropdownMenu
        items={[
          {
            action: () => onEdit?.(),
            text: t("utils.edit"),
            iconStart: <PencilToLine />,
          },
          {
            action: () => onDelete?.(),
            text: t("utils.delete"),
            theme: "danger",
            iconStart: <TrashBin />,
          },
        ]}
      />
    </Card>
  );
};
