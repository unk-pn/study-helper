"use client";

import { Button, TextInput } from "@gravity-ui/uikit";
import { useState } from "react";
import c from "./CreateQuestion.module.css";

interface CreateQuestionProps {
  subjectId: string;
}

export const CreateQuestion = ({ subjectId }: CreateQuestionProps) => {
  const [val, setVal] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = () => {
    const load = async () => {
      try {
        const res = await fetch("/api/questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: val,
            subjectId,
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          console.log("res not ok: ", data.error);
          return;
        }
        setVal("");
        window.location.reload()
      } catch (error) {
        console.log("error creating question: ", error);
      }
    };
    load();
  };

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
