import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useApi } from "@/hooks/useApi";
import { useTranslation } from "react-i18next";
import { setQuestions as setReduxQuestions } from "@/store/slices/questionsSlice";
import { useState } from "react";
import { toast } from "@/lib/toast";
import { changeSubjectQuestionCount } from "@/store/slices/subjectsSlice";

interface QuestionInputType {
  id: string;
  name: string;
  answer: string;
}

export const useCreateQuestionModal = (
  subjectId: string,
  onClose: () => void,
) => {
  const [questions, setQuestions] = useState<QuestionInputType[]>([
    { id: crypto.randomUUID(), name: "", answer: "" },
  ]);
  const dispatch = useAppDispatch();
  const reduxQuestions = useAppSelector((q) => q.questions.questions);
  const { t } = useTranslation();
  const { execute, loading, error, statusCode } = useApi("/api/questions", {
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
    setQuestions(
      questions.map((question) =>
        question.id === id ? { ...question, ...value } : question,
      ),
    );
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const hasEmptyQuestions = questions.some((question) => !question.name.trim());

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
      dispatch(
        changeSubjectQuestionCount({ subjectId, count: questions.length }),
      );
      toast.success(t("questions.toast.create"));
      onClose();
    } else {
      toast.danger(
        t("questions.toast.createError"),
        t("utils.toast.errorDescription", { code: statusCode }),
      );
    }
  };

  return {
    t,
    questions,
    handleAddQuestion,
    handleUpdateQuestion,
    handleDeleteQuestion,
    handleSave,
    hasEmptyQuestions,
    loading,
    error,
  };
};
