import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useApi } from "@/hooks/useApi";
import { deleteQuestion } from "@/store/slices/questionsSlice";
import { QuestionType } from "../types/QuestionType";
import { useTranslation } from "react-i18next";
import { toast } from "@/lib/toast";

export const useQuestion = (id: string) => {
  const dispatch = useAppDispatch();
  const { execute, statusCode } = useApi<QuestionType>(
    "/api/questions",
    {
      refetchOnMount: false,
    },
  );
  const theme = useAppSelector((s) => s.settings.theme);
  const { t } = useTranslation();

  const handleDelete = async () => {
    const data = await execute({
      method: "DELETE",
      body: { id },
    });

    if (data) {
      dispatch(deleteQuestion(id));
      toast.success(t("questions.toast.delete"));
    } else {
      toast.danger(
        t("questions.toast.deleteError"),
        t("utils.toast.errorDescription", { code: statusCode }),
      );
    }
  };

  return {
    t,
    theme,
    handleDelete,
  };
};
