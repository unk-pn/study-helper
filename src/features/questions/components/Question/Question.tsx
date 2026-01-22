import { Card, DropdownMenu } from "@gravity-ui/uikit";
import c from "./Question.module.css";
import { PencilToLine, TrashBin } from "@gravity-ui/icons";
import { useQuestion } from "../../hooks/useQuestion";
import { Spoiler } from "spoiled";
import { useAppSelector } from "@/hooks/redux";
import { useTranslation } from "react-i18next";

interface QuestionProps {
  id: string;
  name: string;
  answer: string | null;
  index?: number;
  onEdit?: () => void;
}

export const Question = ({
  id,
  name,
  answer,
  index,
  onEdit,
}: QuestionProps) => {
  const indx = index !== undefined ? index + 1 : "";
  const { handleDelete } = useQuestion(id, answer);
  const theme = useAppSelector((s) => s.settings.theme);
  const { t } = useTranslation();

  return (
    <Card className={c.question}>
      <div className={c.content}>
        <h2 className={c.index}>
          {indx}. {name}
        </h2>
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
            action: () => handleDelete(),
            text: t("utils.delete"),
            theme: "danger",
            iconStart: <TrashBin />,
          },
        ]}
      />
    </Card>
  );
};
