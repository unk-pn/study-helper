"use client";

import { Button, TextInput } from "@gravity-ui/uikit";
import { DatePicker } from "@gravity-ui/date-components";
import { useCreateSubject } from "../../hooks/useCreateSubject";

export const CreateSubject = () => {
  const {
    open,
    setOpen,
    subjectName,
    setSubjectName,
    subjectDate,
    setSubjectDate,
    loading,
    error,
    handleCreateSubject,
  } = useCreateSubject();

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
