"use client";

import c from "./Question.module.css";
import { Accordion, Button, TextArea } from "@gravity-ui/uikit";
import { useQuestion } from "../../hooks/useQuestion";

interface QuestionProps {
  id: string;
  name: string;
  subjectId: string;
  answer: string | null;
}

export const Question = ({ id, name, subjectId, answer }: QuestionProps) => {
  const {
    openInput,
    setOpenInput,
    answerVal,
    setAnswerVal,
    handleDelete,
    handleAddAnswer,
    handleChangeAnswer,
  } = useQuestion(id, answer);

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
                <Button view="action" onClick={handleAddAnswer}>Сохранить</Button>
                <Button onClick={() => setOpenInput(false)}>Отмена</Button>
              </div>
            </>
          ) : (
            <>
              <pre>{answer}</pre>
              <div className={c.buttons}>
                <Button view="outlined" onClick={handleChangeAnswer}>Изменить ответ</Button>
                <Button view="outlined-danger" onClick={handleDelete}>
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
