"use client";

import { Button, Modal, SegmentedRadioGroup } from "@gravity-ui/uikit";
import c from "./EditSubjectModal.module.css";
import { SubjectStatus } from "../../hooks/useSubject";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateSubject } from "@/store/slices/subjectsSlice";
import { useTranslation } from "react-i18next";
import { useApi } from "@/hooks/useApi";
import { toast } from "@/lib/toast";
import { Subject } from "@/lib/schemas";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditSubjectData, editSubjectSchema } from "@/lib/formSchemas";
import { dateTime } from "@gravity-ui/date-utils";
import { FormDatePicker, FormTextInput } from "@/components";

interface EditSubjectModalProps {
  id: string;
  onClose: () => void;
}

export const EditSubjectModal = ({ id, onClose }: EditSubjectModalProps) => {
  const subject = useAppSelector((s) =>
    s.subjects.subjects.find((subj) => subj.id === id),
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { execute, statusCode } = useApi<Subject>("/api/subjects", {
    refetchOnMount: false,
  });
  const { formState, handleSubmit, control } = useForm<EditSubjectData>({
    resolver: zodResolver(editSubjectSchema),
    defaultValues: {
      id,
      name: subject?.name || "",
      status: subject?.status,
      date: subject?.examDate ? dateTime({ input: subject.examDate }) : null,
    },
  });

  const onSubmit = handleSubmit(async (zData) => {
    const data = await execute({
      method: "PATCH",
      body: {
        id,
        name: zData.name.trim(),
        status: zData.status,
        date: zData.date?.format("YYYY-MM-DD"),
      },
    });

    if (data) {
      dispatch(updateSubject(data));
      onClose();
      toast.success(t("subjects.toast.update", { name: zData.name }));
    } else {
      toast.danger(
        t("subjects.toast.updateError"),
        t("utils.toast.errorDescription", { code: statusCode }),
      );
    }
  });

  return (
    <Modal open={true} onClose={onClose}>
      <form
        className={c.editForm}
        onSubmit={onSubmit}
      >
        <h1 className={c.title}>{t("subjects.editSubject")}</h1>

        <FormTextInput
          name="name"
          control={control}
          className={c.input}
          placeholder={t("subjects.subject")}
          hasClear
          size="m"
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <SegmentedRadioGroup
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
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
          )}
        />

        <FormDatePicker
          name="date"
          control={control}
          format={"DD.MM.YYYY"}
          className={c.input}
          placeholder={t("subjects.date")}
        />
        <div className={c.buttons}>
          <Button view="action" type="submit" loading={formState.isSubmitting}>
            {t("utils.save")}
          </Button>
          <Button onClick={() => onClose()}>{t("utils.cancel")}</Button>
        </div>
      </form>
    </Modal>
  );
};
