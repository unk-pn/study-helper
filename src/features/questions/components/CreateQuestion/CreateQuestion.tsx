"use client";

import { Button, TextInput } from "@gravity-ui/uikit";
import c from "./CreateQuestion.module.css";
import { useCreateQuestion } from "../../hooks/useCreateQuestion";

interface CreateQuestionProps {
  subjectId: string;
}

export const CreateQuestion = ({ subjectId }: CreateQuestionProps) => {
  const { val, setVal, open, setOpen, handleSubmit } =
    useCreateQuestion(subjectId);

  return (
    <div>
      <Button onClick={() => setOpen(!open)}>
        {open ? "Отмена" : "Добавить вопрос"}
      </Button>
      {open && (
        <form onSubmit={handleSubmit} className={c.form}>
          <TextInput
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <Button onClick={handleSubmit}>Создать</Button>
        </form>
      )}
    </div>
  );
};
