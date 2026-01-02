"use client";

import { useRouter } from "next/navigation";
import c from "./Subject.module.css";
import { Card, TextInput, SegmentedRadioGroup } from "@gravity-ui/uikit";
import { useEffect, useState } from "react";
import { DatePicker } from "@gravity-ui/date-components";
import { DateTime } from "@gravity-ui/date-utils";

interface SubjectProps {
  id: string;
  name: string;
  status: string;
  examDate: string;
}

enum SubjectStatus {
  IN_PROGRESS,
  PASSED,
  FAILED,
}

const formatDate = (date: string | null) => {
  if (!date) return "Не указана";
  const [year, month, day] = date.split("T")[0].split("-");
  return `${day}.${month}.${year}`;
};

export const Subject = ({ id, name, status, examDate }: SubjectProps) => {
  const [editState, setEditState] = useState<boolean>(false);
  const [statusState, setStatusState] = useState<string>(status);
  const [nameState, setNameState] = useState<string>(name);
  const [dateState, setDateState] = useState<DateTime | null>(null);
  const router = useRouter();

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

  return (
    <Card className={c.subject} view={editState ? "outlined" : "filled"}>
      {!editState ? (
        <>
          <h2>{name}</h2>
          <p>Статус: {statusText(statusState)}</p>
          <p>Дата: {formatDate(examDate)}</p>
          <button onClick={() => router.push(`/subjects/${id}`)}>
            Вопросы
          </button>
          <button onClick={handleDelete}>Удалить</button>
          <button onClick={() => setEditState(true)}>Изменить</button>
        </>
      ) : (
        <>
          <TextInput
            size="m"
            value={nameState}
            onChange={(e) => setNameState(e.target.value)}
          />

          <SegmentedRadioGroup
            value={statusState}
            onChange={(e) => setStatusState(e.target.value)}
          >
            <SegmentedRadioGroup.Option
              value={SubjectStatus[SubjectStatus.IN_PROGRESS]}
            >
              В процессе
            </SegmentedRadioGroup.Option>
            <SegmentedRadioGroup.Option
              value={SubjectStatus[SubjectStatus.PASSED]}
            >
              Сдан
            </SegmentedRadioGroup.Option>
            <SegmentedRadioGroup.Option
              value={SubjectStatus[SubjectStatus.FAILED]}
            >
              Не сдан
            </SegmentedRadioGroup.Option>
          </SegmentedRadioGroup>

          <DatePicker
            size="m"
            value={dateState}
            onUpdate={setDateState}
            format={"DD.MM.YYYY"}
          />

          <button onClick={saveChanges}>Сохранить</button>
          <button onClick={() => setEditState(false)}>Отмена</button>
        </>
      )}
    </Card>
  );
};
