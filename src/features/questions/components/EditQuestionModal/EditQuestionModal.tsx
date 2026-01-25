import { Button, Modal, TextArea, TextInput } from "@gravity-ui/uikit";
import c from "./EditQuestionModal.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useState } from "react";
import { updateQuestion } from "@/store/slices/questionsSlice";
import { useTranslation } from "react-i18next";
import { useApi } from "@/hooks/useApi";
import { QuestionType } from "../../types/QuestionType";
import { toast } from "@/lib/toast";

interface EditQuestionModalProps {
  id: string;
  onClose: () => void;
}

export const EditQuestionModal = ({ id, onClose }: EditQuestionModalProps) => {
  const dispatch = useAppDispatch();
  const question = useAppSelector((s) =>
    s.questions.questions.find((q) => q.id === id),
  );
  const [name, setName] = useState(question?.name || "");
  const [answer, setAnswer] = useState(question?.answer || "");
  const { t } = useTranslation();
  const { execute, loading, statusCode } = useApi<QuestionType>(
    "/api/questions",
    {
      refetchOnMount: false,
    },
  );

  const handleSave = async () => {
    const data = await execute({
      method: "PATCH",
      body: {
        id,
        name: name.trim(),
        answer: answer.trim(),
      },
    });

    if (data) {
      dispatch(updateQuestion(data));
      toast.success(t("questions.toast.update"));
      onClose();
    } else {
      toast.danger(
        t("questions.toast.updateError"),
        t("utils.toast.errorDescription", { code: statusCode }),
      );
    }
  };

  return (
    <Modal open={true} onClose={onClose} disableBodyScrollLock={true}>
      <div className={c.editForm} onClick={(e) => e.stopPropagation()}>
        <h1 className={c.title}>{t("questions.editingQuestion")}</h1>
        <TextInput
          size="m"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={c.textInput}
          placeholder={t("questions.question")}
          hasClear
        />
        <TextArea
          size="m"
          value={answer}
          minRows={3}
          onChange={(e) => setAnswer(e.target.value)}
          className={c.input}
          placeholder={t("questions.answer")}
          hasClear
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
