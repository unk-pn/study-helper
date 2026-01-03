"use client";

import { useRouter } from "next/navigation";
import c from "./Subject.module.css";
import { useState } from "react";
import {
  Card,
  TextInput,
  SegmentedRadioGroup,
  Button,
  Text,
} from "@gravity-ui/uikit";
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

  const cancelEdit = () => {
    setEditState(false);
    setStatusState(status);
    setNameState(name);
    setDateState(null);
  };

  return (
    <Card className={c.subject} view={editState ? "outlined" : "filled"}>
      {!editState ? (
        <>
          <Text variant="header-2">{name}</Text>
          <Text>Статус: {statusText(statusState)}</Text>
          <Text>Дата: {formatDate(examDate)}</Text>
          <div className={c.buttons}>
            <Button onClick={() => router.push(`/subjects/${id}`)} view="outlined">
              Вопросы
            </Button>
            <Button onClick={() => setEditState(true)} view="outlined-action">Изменить</Button>
            <Button onClick={handleDelete} view="outlined-danger">
              Удалить
            </Button>
          </div>
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
          <div className={c.buttons}>
            <Button onClick={saveChanges} view="outlined">
              Сохранить
            </Button>
            <Button onClick={cancelEdit} view="outlined-danger">
              Отмена
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};
