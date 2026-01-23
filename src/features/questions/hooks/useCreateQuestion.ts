import { useAppDispatch } from "@/hooks/redux";
import { useApi } from "@/hooks/useApi";
import { addQuestion } from "@/store/slices/questionsSlice";
import { FormEvent, useRef, useState } from "react";
import { QuestionType } from "../types/QuestionType";

export const useCreateQuestion = (subjectId: string) => {
  const [val, setVal] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { execute, loading, error } = useApi<QuestionType>("/api/questions", {
    refetchOnMount: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = await execute({
      method: "POST",
      body: {
        name: val.trim(),
        subjectId,
      },
    });

    if (data) {
      dispatch(addQuestion(data));
      setVal("");
      setOpen(false);
    }
  };

  return {
    val,
    setVal,
    open,
    setOpen,
    inputRef,
    loading,
    error,
    handleSubmit,
  };
};
