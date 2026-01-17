import { Card, DropdownMenu } from "@gravity-ui/uikit";
import c from "./Question.module.css";
import { PencilToLine, TrashBin } from "@gravity-ui/icons";
import { useQuestion } from "../../hooks/useQuestion";

interface QuestionProps {
  id: string;
  name: string;
  answer: string | null;
  index?: number;
}

export const Question = ({ id, name, answer, index }: QuestionProps) => {
  const indx = index !== undefined ? index + 1 : "";
  const {
    handleDelete,
  } = useQuestion(id, answer);
  return (
    <Card className={c.question}>
      <div className={c.content}>
        <h2 className={c.index}>
          {indx}. {name}
        </h2>
        <pre className={c.answer}>{answer || "Нет ответа"}</pre>
      </div>
      <DropdownMenu
        items={[
          {
            // action: () => onEdit?.(),
            action: () => {},
            text: "Изменить",
            iconStart: <PencilToLine />,
          },
          {
            action: () => handleDelete(),
            text: "Удалить",
            theme: "danger",
            iconStart: <TrashBin />,
          },
        ]}
      />
    </Card>
  );
};
