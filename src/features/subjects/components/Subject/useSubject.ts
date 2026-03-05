import { useAppSelector } from "@/hooks/redux";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export enum SubjectStatus {
  IN_PROGRESS,
  PASSED,
  FAILED,
}

export const useSubject = (id: string) => {
  const subject = useAppSelector((s) =>
    s.subjects.subjects.find((subj) => subj.id === id),
  );
  const router = useRouter();
  const { t } = useTranslation();
  const { loading, error } = useApi("/api/subjects");

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

  return {
    t,
    loading,
    error,
    router,
    subject,
    statusText,
    labelTheme,
  };
};
