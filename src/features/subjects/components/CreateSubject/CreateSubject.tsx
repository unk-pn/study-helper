"use client";

import { Button, TextInput } from "@gravity-ui/uikit";
import { DatePicker } from "@gravity-ui/date-components";
import { useCreateSubject } from "../../hooks/useCreateSubject";
import c from "./CreateSubject.module.css";

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
    <div className={c.container}>
      <div className={c.header}>
        <h1 className={c.title}>Your Subjects</h1>
        <Button onClick={() => setOpen(!open)} view="action" loading={loading}>
          {open ? "Отмена" : "Добавить предмет"}
        </Button>
      </div>
      {open && (
        <form className={c.form} onSubmit={handleCreateSubject}>
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
          <Button type="submit" disabled={loading || !subjectName}>
            Создать
          </Button>
        </form>
      )}
    </div>
  );
};
