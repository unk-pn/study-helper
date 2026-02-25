import { Button, Modal } from "@gravity-ui/uikit";
import c from "./EditQuestionModal.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateQuestion } from "@/store/slices/questionsSlice";
import { useTranslation } from "react-i18next";
import { useApi } from "@/hooks/useApi";
import { toast } from "@/lib/toast";
import { Question } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditQuestionData, editQuestionSchema } from "@/lib/formSchemas";
import { FormTextArea, FormTextInput } from "@/components";

interface EditQuestionModalProps {
  id: string;
  onClose: () => void;
}

export const EditQuestionModal = ({ id, onClose }: EditQuestionModalProps) => {
  const dispatch = useAppDispatch();
  const question = useAppSelector((s) =>
    s.questions.questions.find((q) => q.id === id),
  );
  const { t } = useTranslation();
  const { execute, statusCode } = useApi<Question>("/api/questions", {
    refetchOnMount: false,
  });

  const form = useForm<EditQuestionData>({
    resolver: zodResolver(editQuestionSchema),
    defaultValues: {
      name: question?.name || "",
      answer: question?.answer || "",
    },
  });

  const handleSave = form.handleSubmit(async (data) => {
    const res = await execute({
      method: "PATCH",
      body: {
        id,
        name: data.name.trim(),
        answer: data.answer.trim(),
      },
    });

    if (res) {
      dispatch(updateQuestion(res));
      toast.success(t("questions.toast.update"));
      onClose();
    } else {
      toast.danger(
        t("questions.toast.updateError"),
        t("utils.toast.errorDescription", { code: statusCode }),
      );
    }
  });

  return (
    <Modal open={true} onClose={onClose} disableBodyScrollLock={true}>
      <div className={c.editForm}>
        <h1 className={c.title}>{t("questions.editingQuestion")}</h1>
        <FormTextInput
          name={"name"}
          control={form.control}
          size="m"
          className={c.textInput}
          placeholder={t("questions.question")}
        />
        <FormTextArea
          name={"answer"}
          control={form.control}
          size="m"
          minRows={3}
          className={c.input}
          placeholder={t("questions.answer")}
        />

        <div className={c.buttons}>
          <Button
            onClick={handleSave}
            view="action"
            loading={form.formState.isSubmitting}
          >
            {t("utils.save")}
          </Button>
          <Button onClick={() => onClose()}>{t("utils.cancel")}</Button>
        </div>
      </div>
    </Modal>
  );
};
