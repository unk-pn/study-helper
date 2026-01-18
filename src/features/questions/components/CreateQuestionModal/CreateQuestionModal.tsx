"use client";

import { Button, Modal } from "@gravity-ui/uikit";
import c from "./CreateQuestionModal.module.css";
import { useState } from "react";
import { QuestionInput } from "./QuestionInput/QuestionInput";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setQuestions as setReduxQuestions } from "@/store/slices/questionsSlice";

interface CreateQuestionModalProps {
  subjectId: string;
  onClose: () => void;
}

interface QuestionInputType {
  id: string;
  name: string;
  answer: string;
}

export const CreateQuestionModal = ({
  subjectId,
  onClose,
}: CreateQuestionModalProps) => {
  const [questions, setQuestions] = useState<QuestionInputType[]>([
    { id: crypto.randomUUID(), name: "", answer: "" },
  ]);
  const dispatch = useAppDispatch();
  const reduxQuestions = useAppSelector((q) => q.questions.questions);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { id: crypto.randomUUID(), name: "", answer: "" },
    ]);
  };

  const handleUpdateQuestion = (
    id: string,
    value: Omit<QuestionInputType, "id">,
  ) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...value } : q)));
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const hasEmptyQuestions = questions.some((q) => !q.name.trim());

  const handleSave = async () => {
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questions, subjectId }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to update question: " + data.message);
      }

      dispatch(setReduxQuestions([...reduxQuestions, ...data]));
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error adding questions: ", error);
      } else {
        console.log("Unknown error: ", error);
      }
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div className={c.container}>
        <h1 className={c.title}>Create Questions</h1>

        <div className={c.questionsList}>
          {questions.map((q, index) => (
            <QuestionInput
              key={q.id}
              index={index + 1}
              name={q.name}
              answer={q.answer}
              onNameUpdate={(name) =>
                handleUpdateQuestion(q.id, { name: name, answer: q.answer })
              }
              onAnswerUpdate={(answer) =>
                handleUpdateQuestion(q.id, { name: q.name, answer: answer })
              }
              onDelete={() => handleDeleteQuestion(q.id)}
            />
          ))}
        </div>

        <Button onClick={handleAddQuestion}>Добавить вопрос</Button>

        <div className={c.buttons}>
          <Button
            view="action"
            onClick={handleSave}
            disabled={hasEmptyQuestions}
          >
            Сохранить
          </Button>
          <Button onClick={onClose}>Отмена</Button>
        </div>
      </div>
    </Modal>
  );
};
