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
import { useApi } from "@/hooks/useApi";
import { SubjectType } from "../../types/SubjectType";
import { toast } from "@/lib/toast";

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
  const { execute, loading, statusCode } = useApi<SubjectType>("/api/subjects", {
    refetchOnMount: false,
  });

  const handleSave = async () => {
    const data = await execute({
      method: "PATCH",
      body: {
        id,
        name: name.trim(),
        status,
        date: date?.format("YYYY-MM-DD"),
      },
    });

    if (data) {
      dispatch(updateSubject(data));
      onClose();
      toast.success(t("subjects.toast.update", { name }));
    } else {
      toast.danger(
        t("subjects.toast.updateError"),
        t("utils.toast.errorDescription", { code: statusCode }),
      );
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
          <Button onClick={handleSave} view="action" loading={loading}>
            {t("utils.save")}
          </Button>
          <Button onClick={() => onClose()}>{t("utils.cancel")}</Button>
        </div>
      </div>
    </Modal>
  );
};
