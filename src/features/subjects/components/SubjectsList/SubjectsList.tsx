"use client";

import { useEffect, useState } from "react";
import { EditSubjectModal, Subject } from "@/features/subjects/components";
import c from "./SubjectsList.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSubjects } from "@/store/slices/subjectsSlice";
import { Loader } from "@/components";
import { useTranslation } from "react-i18next";
import { useApi } from "@/hooks/useApi";

export const SubjectsList = () => {
  const dispatch = useAppDispatch();
  const subjects = useAppSelector((s) => s.subjects.subjects);
  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null);
  const { t } = useTranslation();
  const { data, loading } = useApi("/api/subjects");

  useEffect(() => {
    if (data && Array.isArray(data)) {
      dispatch(setSubjects(data));
    }
  }, [data, dispatch]);

  if (loading) return <Loader />;

  return (
    <div className={c.subjectsList}>
      {subjects.map((s) => (
        <Subject
          key={s.id}
          id={s.id}
          name={s.name}
          status={s.status}
          examDate={s.examDate}
          questions={s._count.questions}
          onEdit={() => setEditingSubjectId(s.id)}
        />
      ))}
      {!subjects.length && t("subjects.noSubjects")}

      {editingSubjectId && (
        <EditSubjectModal
          id={editingSubjectId}
          onClose={() => setEditingSubjectId(null)}
        />
      )}
    </div>
  );
};
