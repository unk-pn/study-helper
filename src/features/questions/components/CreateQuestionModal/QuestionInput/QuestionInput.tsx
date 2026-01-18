"use client";

import { TrashBin } from "@gravity-ui/icons";
import { Button, Card, Icon, TextArea, TextInput } from "@gravity-ui/uikit";
import c from "./QuestionInput.module.css";

interface QuestionInputProps {
  index: number;
  name: string;
  answer: string;
  onNameUpdate: (name: string) => void;
  onAnswerUpdate: (answer: string) => void;
  onDelete: () => void;
}

export const QuestionInput = ({
  index,
  name,
  answer,
  onNameUpdate,
  onAnswerUpdate,
  onDelete,
}: QuestionInputProps) => {
  const i = index.toString();
  return (
    <Card className={c.card}>
      <div className={c.inputs}>
        <TextInput
          placeholder="Question"
          label={`${i}.`}
          value={name}
          onUpdate={onNameUpdate}
          className={c.textInput}
          hasClear
        />
        <TextArea
          placeholder="Answer"
          value={answer}
          onUpdate={onAnswerUpdate}
          minRows={3}
          hasClear
        />
      </div>

      <Button onClick={onDelete}>
        <Icon data={TrashBin} />
      </Button>
    </Card>
  );
};
