import { useState } from "react";

export const useCreateQuestion = (subjectId: string) => {
  const [val, setVal] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = () => {
    const load = async () => {
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
        setVal("");
        window.location.reload();
      } catch (error) {
        console.log("error creating question: ", error);
      }
    };
    load();
  };

  return {
    val,
    setVal,
    open,
    setOpen,
    handleSubmit,
  };
};