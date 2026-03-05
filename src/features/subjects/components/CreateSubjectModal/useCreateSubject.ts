import { useAppDispatch } from "@/hooks/redux";
import { useApi } from "@/hooks/useApi";
import { addSubject } from "@/store/slices/subjectsSlice";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/lib/toast";
import { Subject } from "@prisma/client";
import { useForm } from "react-hook-form";
import { CreateSubjectData, createSubjectSchema } from "@/lib/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

export const useCreateSubject = () => {
  const [open, setOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { execute, statusCode } = useApi<Subject>("/api/subjects", {
    refetchOnMount: false,
  });
  const { t } = useTranslation();
  const form = useForm<CreateSubjectData>({
    resolver: zodResolver(createSubjectSchema),
    defaultValues: { name: "", date: null },
  });

  const handleCreateSubject = form.handleSubmit(async (zData) => {
    const body = {
      name: zData.name.trim(),
      date: zData.date ? zData.date.format("YYYY-MM-DD") : null,
      userId: session?.user.id,
    };

    const data = await execute({
      method: "POST",
      body: body,
    });

    if (data) {
      const subjectWithCount = {
        ...data,
        _count: { questions: 0 },
      };

      dispatch(addSubject(subjectWithCount));

      form.reset();
      setOpen(false);
      toast.success(t("subjects.toast.create", { name: zData.name }));
    } else {
      toast.danger(
        t("subjects.toast.createError"),
        t("utils.toast.errorDescription", { code: statusCode }),
      );
    }
  });

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    form.reset();
  };

  return {
    t,
    open,
    setOpen,
    form,
    inputRef,
    handleCreateSubject,
    handleOpenModal,
    handleCloseModal,
  };
};
