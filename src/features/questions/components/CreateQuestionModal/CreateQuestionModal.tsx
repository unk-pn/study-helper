"use client";

import { Button, Modal } from "@gravity-ui/uikit";
import c from "./CreateQuestionModal.module.css";
import { QuestionInput } from "./QuestionInput/QuestionInput";
import { useCreateQuestionModal } from "../../hooks/useCreateQuestionModal";

interface CreateQuestionModalProps {
  subjectId: string;
  onClose: () => void;
}

export const CreateQuestionModal = ({
  subjectId,
  onClose,
}: CreateQuestionModalProps) => {
  const {
    t,
    form,
    fields,
    remove,
    handleAddQuestion,
    handleSave,
    loading,
  } = useCreateQuestionModal(subjectId, onClose);

  return (
    <Modal open={true} onClose={onClose}>
      <div className={c.container}>
        <h1 className={c.title}>{t("questions.createQuestion")}</h1>

        <div className={c.questionsList}>
          {fields.map((field, index) => (
            <QuestionInput
              key={field.id}
              control={form.control}
              index={index}
              onDelete={() => remove(index)}
            />
          ))}
        </div>

        <Button onClick={handleAddQuestion}>
          {t("questions.addQuestion")}
        </Button>

        <div className={c.buttons}>
          <Button
            view="action"
            onClick={handleSave}
            disabled={!form.formState.isValid}
            loading={loading}
          >
            {t("utils.save")}
          </Button>
          <Button onClick={onClose}>{t("utils.cancel")}</Button>
        </div>
      </div>
    </Modal>
  );
};
