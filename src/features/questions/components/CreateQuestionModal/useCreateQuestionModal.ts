import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useApi } from "@/hooks/useApi";
import { useTranslation } from "react-i18next";
import { setQuestions as setReduxQuestions } from "@/store/slices/questionsSlice";
import { toast } from "@/lib/toast";
import { changeSubjectQuestionCount } from "@/store/slices/subjectsSlice";
import { useFieldArray, useForm } from "react-hook-form";
import { CreateQuestionData, createQuestionSchema } from "@/lib/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

export const useCreateQuestionModal = (
  subjectId: string,
  onClose: () => void,
) => {
  const dispatch = useAppDispatch();
  const reduxQuestions = useAppSelector((q) => q.questions.questions);
  const { t } = useTranslation();
  const { execute, statusCode } = useApi("/api/questions", {
    refetchOnMount: false,
  });

  const form = useForm<CreateQuestionData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: { questions: [{ name: "", answer: "" }] },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const handleAddQuestion = () => {
    append({ name: "", answer: "" });
  };

  const handleSave = form.handleSubmit(async (data) => {
    const res = await execute({
      method: "POST",
      body: {
        questions: data.questions.map((q) => ({
          name: q.name.trim(),
          answer: q.answer.trim(),
        })),
        subjectId,
      },
    });

    if (res && Array.isArray(res)) {
      dispatch(setReduxQuestions([...reduxQuestions, ...res]));
      dispatch(
        changeSubjectQuestionCount({ subjectId, count: data.questions.length }),
      );
      toast.success(t("questions.toast.create"));
      onClose();
    } else {
      toast.danger(
        t("questions.toast.createError"),
        t("utils.toast.errorDescription", { code: statusCode }),
      );
    }
  });

  return {
    t,
    form,
    fields,
    remove,
    handleAddQuestion,
    handleSave,
    loading: form.formState.isSubmitting,
  };
};
