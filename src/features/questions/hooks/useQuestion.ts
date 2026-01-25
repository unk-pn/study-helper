import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useApi } from "@/hooks/useApi";
import { deleteQuestion } from "@/store/slices/questionsSlice";
import { useEffect, useRef, useState } from "react";
import { QuestionType } from "../types/QuestionType";
import { useTranslation } from "react-i18next";

export const useQuestion = (id: string) => {
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [answerVal, setAnswerVal] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const { execute, loading, error } = useApi<QuestionType>("/api/questions", {
    refetchOnMount: false,
  });
  const theme = useAppSelector((s) => s.settings.theme);
  const { t } = useTranslation();

  useEffect(() => {
    if (openInput && inputRef.current) {
      const textarea = inputRef.current;
      textarea.focus();

      const length = textarea.value.length;
      textarea.setSelectionRange(length, length);

      textarea.scrollTop = textarea.scrollHeight;
    }
  }, [openInput]);

  const handleDelete = async () => {
    const data = await execute({
      method: "DELETE",
      body: { id },
    });

    if (data) {
      dispatch(deleteQuestion(id));
    }
  };

  return {
    t,
    theme,
    openInput,
    setOpenInput,
    answerVal,
    setAnswerVal,
    inputRef,
    loading,
    error,
    handleDelete,
  };
};
