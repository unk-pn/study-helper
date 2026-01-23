"use client";

import { Button, Modal } from "@gravity-ui/uikit";
import c from "./CreateQuestionModal.module.css";
import { useState } from "react";
import { QuestionInput } from "./QuestionInput/QuestionInput";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setQuestions as setReduxQuestions } from "@/store/slices/questionsSlice";
import { useTranslation } from "react-i18next";
import { useApi } from "@/hooks/useApi";

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
  const { t } = useTranslation();
  const { execute, loading, error } = useApi("/api/questions", {
    refetchOnMount: false,
  });

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
    const data = await execute({
      method: "POST",
      body: {
        questions: questions.map((q) => ({
          ...q,
          name: q.name.trim(),
          answer: q.answer.trim(),
        })),
        subjectId,
      },
    });

    if (data && Array.isArray(data)) {
      dispatch(setReduxQuestions([...reduxQuestions, ...data]));
      onClose();
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div className={c.container}>
        <h1 className={c.title}>{t("questions.createQuestion")}</h1>

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

        <Button onClick={handleAddQuestion}>
          {t("questions.addQuestion")}
        </Button>

        <div className={c.buttons}>
          <Button
            view="action"
            onClick={handleSave}
            disabled={hasEmptyQuestions}
          >
            {t("utils.save")}
          </Button>
          <Button onClick={onClose}>{t("utils.cancel")}</Button>
        </div>
      </div>
    </Modal>
  );
};
