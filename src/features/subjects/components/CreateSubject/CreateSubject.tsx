"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export const CreateSubject = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [subjectName, setSubjectName] = useState<string>("");
  const [subjectDate, setSubjectDate] = useState<string>("");
  const { data: session } = useSession();

  const handleCreateSubject = async () => {
    const create = async () => {
      try {
        const res = await fetch("/api/subjects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: subjectName,
            date: subjectDate,
            userId: session?.user.id,
          }),
        });

        const data = await res.json();
        if (!res.ok) console.log(data.error);
        setSubjectName("");
        setSubjectDate("");
      } catch (error) {
        console.log("error creating subject: ", error);
      }
    };
    create();
  };
  return (
    <>
      <button onClick={() => setOpen(!open)}>
        {open ? "Отмена" : "Добавить предмет"}
      </button>
      {open && (
        <div>
          <input
            type="text"
            placeholder="Название предмета"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
          <input
            type="date"
            value={subjectDate}
            onChange={(e) => setSubjectDate(e.target.value)}
          />
          <button onClick={handleCreateSubject}>Создать</button>
        </div>
      )}
    </>
  );
};
