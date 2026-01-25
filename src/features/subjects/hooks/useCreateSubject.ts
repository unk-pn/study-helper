import { useAppDispatch } from "@/hooks/redux";
import { useApi } from "@/hooks/useApi";
import { addSubject } from "@/store/slices/subjectsSlice";
import { DateTime } from "@gravity-ui/date-utils";
import { useSession } from "next-auth/react";
import { FormEvent, useCallback, useRef, useState } from "react";
import { SubjectType } from "../types/SubjectType";
import { useTranslation } from "react-i18next";
import { toast } from "@/lib/toast";

export const useCreateSubject = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [subjectName, setSubjectName] = useState<string>("");
  const [subjectDate, setSubjectDate] = useState<DateTime | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { execute, error, statusCode } = useApi<SubjectType>("/api/subjects", {
    refetchOnMount: false,
  });
  const { t } = useTranslation();

  const handleCreateSubject = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (!subjectName.trim()) {
        toast.warning(t("subjects.toast.createWarning"));
        return;
      }

      const data = await execute({
        method: "POST",
        body: {
          name: subjectName.trim(),
          date: subjectDate?.format("YYYY-MM-DD"),
          userId: session?.user.id,
        },
      });

      if (data) {
        const subjectWithCount = {
          ...data,
          _count: { questions: 0 },
        };

        dispatch(addSubject(subjectWithCount));

        setSubjectName("");
        setSubjectDate(null);
        setOpen(false);
        toast.success(t("subjects.toast.create", { name: subjectName }));
      } else {
        toast.danger(
          t("subjects.toast.createError"),
          t("utils.toast.errorDescription", { code: statusCode }),
        );
      }
    },
    [subjectName, subjectDate, session, execute, dispatch, statusCode, t],
  );

  const handleClear = () => {
    setSubjectName("");
    setSubjectDate(null);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    handleClear();
  };

  return {
    t,
    open,
    setOpen,
    subjectName,
    setSubjectName,
    subjectDate,
    setSubjectDate,
    error,
    inputRef,
    handleCreateSubject,
    handleOpenModal,
    handleCloseModal,
  };
};
