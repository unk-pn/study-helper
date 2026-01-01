"use client";
import { useState } from "react";
import c from "./Question.module.css";
import { Accordion, Button, TextArea } from "@gravity-ui/uikit";

interface QuestionProps {
  id: string;
  name: string;
  subjectId: string;
  answer: string | null;
}

export const Question = ({ id, name, subjectId, answer }: QuestionProps) => {
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [answerVal, setAnswerVal] = useState<string>("");

  const handleDelete = async () => {
    try {
      const res = await fetch("/api/questions", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("res not ok: ", data.error);
        return;
      }
      window.location.reload();
    } catch (error) {
      console.log("error deleting question: ", error);
    }
  };

  const handleAddAnswer = async () => {
    try {
      const res = await fetch("/api/questions", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer: answerVal,
          id: id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("res not ok: ", data.error);
        return;
      }
      window.location.reload();
    } catch (error) {
      console.log("error deleting question: ", error);
    }
  };

  return (
    <Accordion.Item summary={name}>
      {answer ? (
        <div>
          <p>{answer}</p>
          <Button onClick={() => setOpenInput(true)}>Изменить ответ</Button>
          <Button view="raised" onClick={handleDelete}>
            Удалить
          </Button>
        </div>
      ) : (
        <div>
          {!openInput ? (
            <Button onClick={() => setOpenInput(true)}>Добавить ответ</Button>
          ) : (
            <div>
              <TextArea
                value={answerVal}
                onChange={(e) => setAnswerVal(e.target.value)}
                size="l"
                minRows={3}
                maxRows={6}
                hasClear
              />
              <br />
              <Button view="raised" onClick={handleAddAnswer}>
                Добавить ответ
              </Button>
              <Button onClick={() => setOpenInput(false)}>Закрыть</Button>
            </div>
          )}
        </div>
      )}
    </Accordion.Item>
  );
};
