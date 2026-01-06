import { useState } from "react";

export const useQuestion = (id: string, answer: string | null) => {
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [answerVal, setAnswerVal] = useState<string>("");

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
      window.location.reload();
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
          answer: answerVal,
          id: id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("res not ok: ", data.error);
        return;
      }
      setAnswerVal("");
      window.location.reload();
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
    handleDelete,
    handleAddAnswer,
    handleChangeAnswer,
  };
};