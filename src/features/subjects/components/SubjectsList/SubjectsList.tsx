"use client";

import { useEffect, useState } from "react";
import { EditSubjectModal, Subject } from "@/features/subjects/components";
import c from "./SubjectsList.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { deleteSubject, setSubjects } from "@/store/slices/subjectsSlice";
import { ConfirmDialog, Loader } from "@/components";
import { useTranslation } from "react-i18next";
import { useApi } from "@/hooks/useApi";
import { toast } from "@/lib/toast";

export const SubjectsList = () => {
  const dispatch = useAppDispatch();
  const subjects = useAppSelector((s) => s.subjects.subjects);
  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null);
  const [deletingSubjectId, setDeletingSubjectId] = useState<string | null>(
    null,
  );
  const { t } = useTranslation();
  const { execute, data, loading, statusCode } = useApi("/api/subjects");

  useEffect(() => {
    if (data && Array.isArray(data)) {
      dispatch(setSubjects(data));
    }
  }, [data, dispatch]);

  const deletingSubject = subjects.find((s) => deletingSubjectId === s.id);

  const handleDelete = async () => {
    if (deletingSubject) {
      const data = await execute({
        method: "DELETE",
        body: { id: deletingSubject?.id },
      });

      if (data) {
        dispatch(deleteSubject(deletingSubject.id));
        toast.danger(
          t("subjects.toast.delete", { name: deletingSubject?.name }),
        );
      } else {
        toast.danger(
          t("subjects.toast.deleteError"),
          t("utils.toast.errorDescription", { code: statusCode }),
        );
      }
    }

    setDeletingSubjectId(null);
  };

  if (loading) return <Loader />;

  return (
    <div className={c.subjectsList}>
      {subjects.map((s) => (
        <Subject
          key={s.id}
          id={s.id}
          onEdit={() => setEditingSubjectId(s.id)}
          onDelete={() => setDeletingSubjectId(s.id)}
        />
      ))}

      {!subjects.length && t("subjects.noSubjects")}

      {editingSubjectId && (
        <EditSubjectModal
          id={editingSubjectId}
          onClose={() => setEditingSubjectId(null)}
        />
      )}

      {deletingSubject && (
        <ConfirmDialog
          type="subject"
          open={!!deletingSubjectId}
          subjectName={deletingSubject.name}
          questionCount={deletingSubject?._count.questions || 0}
          onClose={() => setDeletingSubjectId(null)}
          onApply={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};
