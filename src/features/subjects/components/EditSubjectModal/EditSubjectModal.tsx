"use client";

import {
  Button,
  Modal,
  SegmentedRadioGroup,
  TextInput,
} from "@gravity-ui/uikit";
import c from "./EditSubjectModal.module.css";
import { DatePicker } from "@gravity-ui/date-components";
import { SubjectStatus } from "../../hooks/useSubject";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useState } from "react";
import { DateTime } from "@gravity-ui/date-utils";
import { updateSubject } from "@/store/slices/subjectsSlice";
import { useTranslation } from "react-i18next";

interface EditSubjectModalProps {
  id: string;
  onClose: () => void;
}

export const EditSubjectModal = ({ id, onClose }: EditSubjectModalProps) => {
  const subject = useAppSelector((s) =>
    s.subjects.subjects.find((subj) => subj.id === id),
  );
  const dispatch = useAppDispatch();
  const [name, setName] = useState(subject?.name || "");
  const [status, setStatus] = useState(subject?.status || "");
  const [date, setDate] = useState<DateTime | null>(null);
  const { t } = useTranslation();

  const handleSave = async () => {
    try {
      const res = await fetch("/api/subjects", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name: name.trim(),
          status,
          date: date?.format("YYYY-MM-DD"),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to update subject: " + data.message);
      }
      dispatch(updateSubject(data));
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error updating subject: ", error);
      } else {
        console.log("Unknown error: ", error);
      }
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <div className={c.editForm} onClick={(e) => e.stopPropagation()}>
        <h1 className={c.title}>{t("subjects.editSubject")}</h1>
        <TextInput
          size="m"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={c.input}
          placeholder={t("subjects.subject")}
          hasClear
        />

        <SegmentedRadioGroup
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={c.input}
        >
          <SegmentedRadioGroup.Option
            value={SubjectStatus[SubjectStatus.IN_PROGRESS]}
          >
            {t("subjects.status.inProgress")}
          </SegmentedRadioGroup.Option>
          <SegmentedRadioGroup.Option
            value={SubjectStatus[SubjectStatus.PASSED]}
          >
            {t("subjects.status.passed")}
          </SegmentedRadioGroup.Option>
          <SegmentedRadioGroup.Option
            value={SubjectStatus[SubjectStatus.FAILED]}
          >
            {t("subjects.status.failed")}
          </SegmentedRadioGroup.Option>
        </SegmentedRadioGroup>

        <DatePicker
          size="m"
          value={date}
          onUpdate={setDate}
          format={"DD.MM.YYYY"}
          className={c.input}
          placeholder={t("subjects.date")}
        />
        <div className={c.buttons}>
          <Button onClick={handleSave} view="action">
            {t("utils.save")}
          </Button>
          <Button onClick={() => onClose()}>{t("utils.cancel")}</Button>
        </div>
      </div>
    </Modal>
  );
};
