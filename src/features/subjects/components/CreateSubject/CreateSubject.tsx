"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button, TextInput } from "@gravity-ui/uikit";
import { DatePicker } from "@gravity-ui/date-components";
import { DateTime } from "@gravity-ui/date-utils";

export const CreateSubject = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [subjectName, setSubjectName] = useState<string>("");
  const [subjectDate, setSubjectDate] = useState<DateTime | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();

  const handleCreateSubject = async () => {
    if (!subjectName) setError("Название предмета обязательно");
    const create = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/subjects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: subjectName,
            date: subjectDate?.format('YYYY-MM-DD'),
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
  return (
    <>
      <Button onClick={() => setOpen(!open)}>
        {open ? "Отмена" : "Добавить предмет"}
      </Button>
      {open && (
        <div>
          <TextInput
            size="l"
            placeholder="Название предмета"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            hasClear
            label="*"
            validationState={error ? "invalid" : undefined}
          />
          <DatePicker
            size="l"
            value={subjectDate}
            onUpdate={setSubjectDate}
            format={"DD.MM.YYYY"}
          />
          <Button onClick={handleCreateSubject}>Создать</Button>
        </div>
      )}
    </>
  );
};
