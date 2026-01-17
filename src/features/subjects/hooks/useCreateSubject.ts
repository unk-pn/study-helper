import { useAppDispatch } from "@/hooks/redux";
import { useApi } from "@/hooks/useApi";
import { addSubject } from "@/store/slices/subjectsSlice";
import { DateTime } from "@gravity-ui/date-utils";
import { useSession } from "next-auth/react";
import { FormEvent, useCallback, useRef, useState } from "react";
import { SubjectType } from "../types/SubjectType";

export const useCreateSubject = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [subjectName, setSubjectName] = useState<string>("");
  const [subjectDate, setSubjectDate] = useState<DateTime | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const {
    execute: createSubject,
    loading,
    error,
  } = useApi<SubjectType>("/api/subjects");

  const handleCreateSubject = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (!subjectName.trim()) {
        return;
      }

      try {
        const res = await createSubject({
          method: "POST",
          body: {
            name: subjectName.trim(),
            date: subjectDate?.format("YYYY-MM-DD"),
            userId: session?.user.id,
          },
        });

        if (res) {
          const subjectWithCount = {
            ...res,
            _count: { questions: 0 },
          };
          dispatch(addSubject(subjectWithCount));
        }

        setSubjectName("");
        setSubjectDate(null);
        setOpen(false);
      } catch {
        // Ошибка уже обрабатывается в useApi
      }
    },
    [subjectName, subjectDate, session, createSubject]
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
