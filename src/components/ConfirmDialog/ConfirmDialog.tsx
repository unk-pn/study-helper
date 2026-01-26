"use client";

import { Dialog } from "@gravity-ui/uikit";
import { useTranslation } from "react-i18next";

interface ConfirmDialogProps {
  type: "subject" | "question";
  subjectName: string;
  questionCount?: number;
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  loading: boolean;
}

export const ConfirmDialog = ({
  type,
  subjectName,
  questionCount,
  open,
  onClose,
  onApply,
  loading,
}: ConfirmDialogProps) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Header
        caption={
          type === "subject"
            ? t("dialog.deleteSubject", { name: subjectName })
            : t("dialog.deleteQuestion")
        }
      />
      {type === "subject" && (
        <Dialog.Body>
          {t("dialog.deleteSubjectWarning", { count: questionCount })}
        </Dialog.Body>
      )}
      <Dialog.Footer
        textButtonCancel={t("dialog.cancel")}
        onClickButtonCancel={onClose}
        propsButtonCancel={{ view: "outlined" }}
        textButtonApply={t("dialog.confirm")}
        onClickButtonApply={onApply}
        propsButtonApply={{ view: "outlined-danger", loading }}
      />
    </Dialog>
  );
};
