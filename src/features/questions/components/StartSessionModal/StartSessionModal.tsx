"use client";

import { Button, Label, Modal } from "@gravity-ui/uikit";
import c from "./StartSessionModal.module.css";
import { useAppSelector } from "@/hooks/redux";
import { useTranslation } from "react-i18next";

interface StartSessionModalProps {
  subjectId: string;
  onClose: () => void;
}

export const StartSessionModal = ({
  subjectId,
  onClose,
}: StartSessionModalProps) => {
  const subject = useAppSelector((s) =>
    s.subjects.subjects.find((subject) => subject.id === subjectId),
  );
  const { t } = useTranslation();

  if (!subject) return null;

  return (
    <Modal open={true} disableEscapeKeyDown={false} disableOutsideClick={false}>
      <div className={c.container}>
        <div className={c.info}>
          <div className={c.titleWrapper}>
            <h1>{subject.name}</h1>
            <p className={c.subtitle}>{t("questions.studySession")}</p>
          </div>
          <div className={c.stats}>
            <h3>{t("questions.numberOfCards")}</h3>
            <Label>{subject._count.questions}</Label>
          </div>

          <div>
            <h3>{t("questions.miniInstructions")}</h3>
            <ul className={c.instructionsList}>
              <li>{t("questions.instructions.instruction1")}</li>
              <li>{t("questions.instructions.instruction2")}</li>
              <li>{t("questions.instructions.instruction3")}</li>
              <li>{t("questions.instructions.instruction4")}</li>
            </ul>
          </div>
        </div>

        <div className={c.buttons}>
          <Button href={`/subjects/${subjectId}/cards`} view="action">
            {t("utils.start")}
          </Button>
          <Button onClick={onClose}>{t("utils.cancel")}</Button>
        </div>
      </div>
    </Modal>
  );
};
