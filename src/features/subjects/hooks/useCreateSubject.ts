import { DateTime } from "@gravity-ui/date-utils";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const useCreateSubject = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [subjectName, setSubjectName] = useState<string>("");
  const [subjectDate, setSubjectDate] = useState<DateTime | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const handleCreateSubject = async () => {
    if (!subjectName) setError("Название предмета обязательно");
    const create = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/subjects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: subjectName,
            date: subjectDate?.format("YYYY-MM-DD"),
            userId: session?.user.id,
          }),
        });

        const data = await res.json();
        if (!res.ok) console.log(data.error);
        setSubjectName("");
        setSubjectDate(null);
        window.location.reload();
      } catch (error) {
        console.log("error creating subject: ", error);
        setError("Ошибка при создании предмета");
      } finally {
        setLoading(false);
      }
    };
    create();
  };

  
  return {
    open,
    setOpen,
    subjectName,
    setSubjectName,
    subjectDate,
    setSubjectDate,
    loading,
    error,
    handleCreateSubject,
  };
};
