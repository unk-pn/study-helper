"use client";

import { useRouter } from "next/navigation";
import c from "./Subject.module.css";
import {
  Card,
  TextInput,
  SegmentedRadioGroup,
  Button,
  Text,
  DropdownMenu,
  Label,
} from "@gravity-ui/uikit";
import { DatePicker } from "@gravity-ui/date-components";
import { formatDate } from "@/lib/formatDate";
import { SubjectStatus, useSubject } from "../../hooks/useSubject";

interface SubjectProps {
  id: string;
  name: string;
  status: string;
  examDate: string;
}

export const Subject = ({ id, name, status, examDate }: SubjectProps) => {
  const {
    editState,
    setEditState,
    statusState,
    setStatusState,
    nameState,
    setNameState,
    dateState,
    setDateState,
    statusText,
    labelTheme,
    handleDelete,
    saveChanges,
    cancelEdit,
  } = useSubject(id, status, name);
  const router = useRouter();

  return (
    <Card className={c.subject} view={editState ? "outlined" : "filled"}>
      {!editState ? (
        <>
          <div className={c.info}>
            <Text variant="header-2">{name}</Text>
            <Text>Дата: {formatDate(examDate)}</Text>
            {/* <Text>Статус: {statusText(statusState)}</Text> */}
            <Label
              width="auto"
              className={c.label}
              size="xs"
              theme={labelTheme(statusState)}
            >
              {statusText(statusState)}
            </Label>
            <Button
              onClick={() => router.push(`/subjects/${id}`)}
              view="outlined"
            >
              Вопросы
            </Button>
          </div>
          <div className={c.dropdown}>
            <DropdownMenu
              items={[
                {
                  action: () => setEditState(true),
                  text: "Изменить",
                },
                {
                  action: () => handleDelete(),
                  text: "Удалить",
                  theme: "danger",
                },
              ]}
            />
          </div>
        </>
      ) : (
        <div className={c.editForm}>
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
        </div>
      )}
    </Card>
  );
};
