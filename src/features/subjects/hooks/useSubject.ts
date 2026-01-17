import { useAppDispatch } from "@/hooks/redux";
import { deleteSubject } from "@/store/slices/subjectsSlice";

export enum SubjectStatus {
  IN_PROGRESS,
  PASSED,
  FAILED,
}

export const useSubject = (id: string) => {
  const dispatch = useAppDispatch();

  const statusText = (text: string) => {
    switch (text) {
      case SubjectStatus[SubjectStatus.IN_PROGRESS]:
        return "В процессе";
      case SubjectStatus[SubjectStatus.PASSED]:
        return "Сдан";
      case SubjectStatus[SubjectStatus.FAILED]:
        return "Не сдан";
      default:
        return "Неизвестно";
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
