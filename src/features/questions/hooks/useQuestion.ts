import { useAppDispatch } from "@/hooks/redux";
import { useApi } from "@/hooks/useApi";
import { deleteQuestion, updateQuestion } from "@/store/slices/questionsSlice";
import { useEffect, useRef, useState } from "react";
import { QuestionType } from "../types/QuestionType";

export const useQuestion = (id: string, answer: string | null) => {
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [answerVal, setAnswerVal] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();
  const { execute, loading, error } = useApi<QuestionType>("/api/questions", {
    refetchOnMount: false,
  });

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

  const handleAddAnswer = async () => {
    const data = await execute({
      method: "PATCH",
      body: {
        answer: answerVal.trim(),
        id: id,
      },
    });

    if (data) {
      dispatch(updateQuestion(data));
      setAnswerVal("");
      setOpenInput(false);
    }
  };

  const handleChangeAnswer = () => {
    setAnswerVal(answer || "");
    setOpenInput(true);
  };

  return {
    openInput,
    setOpenInput,
    answerVal,
    setAnswerVal,
    inputRef,
    loading,
    error,
    handleDelete,
    handleAddAnswer,
    handleChangeAnswer,
  };
};
