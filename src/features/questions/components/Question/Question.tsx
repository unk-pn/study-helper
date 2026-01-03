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
      setAnswerVal("");
      window.location.reload();
    } catch (error) {
      console.log("error deleting question: ", error);
    }
  };

  const handleChangeAnswer = () => {
    setAnswerVal(answer || "");
    setOpenInput(true);
  };

  return (
    <Accordion.Item summary={name}>
      {answer ? (
        <div className={c.question}>
          {openInput ? (
            <>
              <TextArea
                value={answerVal}
                onChange={(e) => setAnswerVal(e.target.value)}
                size="l"
                minRows={3}
                maxRows={6}
                hasClear
              />
              <div className={c.buttons}>
                <Button onClick={handleAddAnswer}>Сохранить</Button>
                <Button onClick={() => setOpenInput(false)}>Отмена</Button>
              </div>
            </>
          ) : (
            <>
              <pre>{answer}</pre>
              <div className={c.buttons}>
                <Button onClick={handleChangeAnswer}>Изменить ответ</Button>
                <Button view="raised" onClick={handleDelete}>
                  Удалить
                </Button>
              </div>
            </>
          )}
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
              <div className={c.buttons}>
                <Button view="raised" onClick={handleAddAnswer}>
                  Добавить ответ
                </Button>
                <Button onClick={() => setOpenInput(false)}>Закрыть</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Accordion.Item>
  );
};
