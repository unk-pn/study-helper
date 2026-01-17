import { useAppDispatch } from "@/hooks/redux";
import { deleteQuestion, updateQuestion } from "@/store/slices/questionsSlice";
import { useEffect, useRef, useState } from "react";

export const useQuestion = (id: string, answer: string | null) => {
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [answerVal, setAnswerVal] = useState<string>("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (openInput && inputRef.current) {
      const textarea = inputRef.current;
      textarea.focus();

      const length = textarea.value.length;
      textarea.setSelectionRange(length, length);

      textarea.scrollTop = textarea.scrollHeight
    }
  }, [openInput]);

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
      dispatch(deleteQuestion(id));
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
          answer: answerVal.trim(),
          id: id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("res not ok: ", data.error);
        return;
      }
      dispatch(updateQuestion(data));
      setAnswerVal("");
      setOpenInput(false);
    } catch (error) {
      console.log("error deleting question: ", error);
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
    handleDelete,
    handleAddAnswer,
    handleChangeAnswer,
  };
};
