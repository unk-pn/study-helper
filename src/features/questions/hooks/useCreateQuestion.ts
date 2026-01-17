import { useAppDispatch } from "@/hooks/redux";
import { addQuestion } from "@/store/slices/questionsSlice";
import { FormEvent, useRef, useState } from "react";

export const useCreateQuestion = (subjectId: string) => {
  const [val, setVal] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: val,
          subjectId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.log("res not ok: ", data.error);
        return;
      }

      dispatch(addQuestion(data));
      setVal("");
      setOpen(false);
    } catch (error) {
      console.log("error creating question: ", error);
    }
  };

  return {
    val,
    setVal,
    open,
    setOpen,
    inputRef,
    handleSubmit,
  };
};
