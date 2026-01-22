import { useAppDispatch } from "@/hooks/redux";
import { deleteSubject } from "@/store/slices/subjectsSlice";
import { useTranslation } from "react-i18next";

export enum SubjectStatus {
  IN_PROGRESS,
  PASSED,
  FAILED,
}

export const useSubject = (id: string) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const statusText = (text: string) => {
    switch (text) {
      case SubjectStatus[SubjectStatus.IN_PROGRESS]:
        return t("subjects.status.inProgress");
      case SubjectStatus[SubjectStatus.PASSED]:
        return t("subjects.status.passed");
      case SubjectStatus[SubjectStatus.FAILED]:
        return t("subjects.status.failed");
      default:
        return t("subjects.status.inProgress");
    }
  };

  const labelTheme = (status: string) => {
    switch (status) {
      case SubjectStatus[SubjectStatus.PASSED]:
        return "success";
      case SubjectStatus[SubjectStatus.FAILED]:
        return "danger";
      case SubjectStatus[SubjectStatus.IN_PROGRESS]:
        return "normal";
      default:
        return "normal";
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch("/api/subjects", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("res not ok: ", data.error);
        return;
      }
      dispatch(deleteSubject(id));
    } catch (error) {
      console.log("error deleting subject: ", error);
    }
  };

  return {
    statusText,
    labelTheme,
    handleDelete,
  };
};
