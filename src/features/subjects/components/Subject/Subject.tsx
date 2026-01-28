"use client";

import c from "./Subject.module.css";
import { Card, Text, DropdownMenu, Label } from "@gravity-ui/uikit";
import { PencilToLine, TrashBin } from "@gravity-ui/icons";
import { formatDate } from "@/lib/formatDate";
import { useSubject } from "../../hooks/useSubject";

interface SubjectProps {
  id: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const Subject = ({ id, onEdit, onDelete }: SubjectProps) => {
  const { t, router, subject, statusText, labelTheme } = useSubject(id);

  if (!subject) return null;

  return (
    <>
      <Card
        className={c.subject}
        view="outlined"
        type="selection"
        onClick={() => router.push(`/subjects/${id}`)}
      >
        <div className={c.info}>
          <h2 className={c.header}>{subject.name}</h2>
          <Text>
            {subject._count.questions} {t("subjects.questions")}
          </Text>
          <Label
            width="auto"
            className={c.label}
            size="xs"
            theme={labelTheme(subject.status)}
          >
            {statusText(subject.status)}
          </Label>
        </div>
        <div className={c.dropdown} onClick={(e) => e.stopPropagation()}>
          <Label width="auto" className={c.label} size="xs">
            {formatDate(subject.examDate)}
          </Label>
          <DropdownMenu
            items={[
              {
                action: () => onEdit?.(),
                text: t("utils.edit"),
                iconStart: <PencilToLine />,
              },
              {
                action: () => onDelete?.(),
                text: t("utils.delete"),
                theme: "danger",
                iconStart: <TrashBin />,
              },
            ]}
          />
        </div>
      </Card>
    </>
  );
};
