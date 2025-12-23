"use client";

import { useState } from "react";

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
      } catch (error) {
        console.log("error creating question: ", error);
      }
    };
    load();
  };
  return (
    <>
      <button onClick={() => setOpen(!open)}>
        {open ? "Отмена" : "Добавить вопрос"}
      </button>
      {open && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
          <button>Создать</button>
        </form>
      )}
    </>
  );
};
