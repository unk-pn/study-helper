import { useApi } from "@/hooks/useApi";
import { DateTime } from "@gravity-ui/date-utils";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";

export const useCreateSubject = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [subjectName, setSubjectName] = useState<string>("");
  const [subjectDate, setSubjectDate] = useState<DateTime | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();

  const { execute: createSubject, loading, error } = useApi("/api/subjects");

  const handleCreateSubject = useCallback(async () => {
    if (!subjectName.trim()) {
      return;
    }

    try {
      await createSubject({
        method: "POST",
        body: {
          name: subjectName.trim(),
          date: subjectDate?.format("YYYY-MM-DD"),
          userId: session?.user.id,
        },
      });

      setSubjectName("");
      setSubjectDate(null);
      setOpen(false);
      window.location.reload();
    } catch {
      // Ошибка уже обрабатывается в useApi
    }
  }, [subjectName, subjectDate, session, createSubject]);

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
    open,
    setOpen,
    subjectName,
    setSubjectName,
    subjectDate,
    setSubjectDate,
    loading,
    error,
    inputRef,
    handleCreateSubject,
    handleOpenModal,
    handleCloseModal,
  };
};
