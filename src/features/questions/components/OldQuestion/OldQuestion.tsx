"use client";

import c from "./OldQuestion.module.css";
import { Accordion, Button, TextArea } from "@gravity-ui/uikit";
import { useQuestion } from "../../hooks/useQuestion";

interface OldQuestionProps {
  id: string;
  name: string;
  answer: string | null;
}

export const OldQuestion = ({ id, name, answer }: OldQuestionProps) => {
  const {
    openInput,
    setOpenInput,
    answerVal,
    setAnswerVal,
    inputRef,
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
                maxRows={Infinity}
                hasClear
                controlRef={inputRef}
              />
              <div className={c.buttons}>
                <Button view="action" onClick={handleAddAnswer}>
                  Сохранить
                </Button>
                <Button onClick={() => setOpenInput(false)}>Отмена</Button>
              </div>
            </>
          ) : (
            <>
              <pre>{answer}</pre>
              <div className={c.buttons}>
                <Button view="outlined" onClick={handleChangeAnswer}>
                  Изменить ответ
                </Button>
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
            <>
              <Button onClick={() => setOpenInput(true)}>Добавить ответ</Button>
              <Button view="outlined-danger" onClick={handleDelete}>
                Удалить
              </Button>
            </>
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
