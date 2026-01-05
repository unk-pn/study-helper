import { DateTime } from "@gravity-ui/date-utils";
import { useState } from "react";

export enum SubjectStatus {
  IN_PROGRESS,
  PASSED,
  FAILED,
}

export const useSubject = (id: string, status: string, name: string) => {
  const [editState, setEditState] = useState<boolean>(false);
  const [statusState, setStatusState] = useState<string>(status);
  const [nameState, setNameState] = useState<string>(name);
  const [dateState, setDateState] = useState<DateTime | null>(null);

  const statusText = (text: string) => {
    switch (text) {
      case SubjectStatus[SubjectStatus.IN_PROGRESS]:
        return "В процессе";
      case SubjectStatus[SubjectStatus.PASSED]:
        return "Сдан";
      case SubjectStatus[SubjectStatus.FAILED]:
        return "Не сдан";
      default:
        return "Неизвестно";
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch("/api/subjects", {
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
      console.log("error deleting subject: ", error);
    }
  };

  const saveChanges = async () => {
    try {
      const res = await fetch("/api/subjects", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status: statusState,
          name: nameState,
          date: dateState,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("res not ok: ", data.error);
        return;
      }
      setEditState(false);
      window.location.reload();
    } catch (error) {
      console.log("error deleting subject: ", error);
    }
  };

  const cancelEdit = () => {
    setEditState(false);
    setStatusState(status);
    setNameState(name);
    setDateState(null);
  };

  return {
    editState,
    setEditState,
    statusState,
    setStatusState,
    nameState,
    setNameState,
    dateState,
    setDateState,
    statusText,
    handleDelete,
    saveChanges,
    cancelEdit,
  };
};
