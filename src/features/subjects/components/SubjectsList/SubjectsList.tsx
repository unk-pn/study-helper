"use client";

import { useEffect, useState } from "react";
import { EditSubjectModal, Subject } from "@/features/subjects/components";
import c from "./SubjectsList.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  setError,
  setLoading,
  setSubjects,
} from "@/store/slices/subjectsSlice";
import { Loader } from "@/components";
import { useTranslation } from "react-i18next";

export const SubjectsList = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((s) => s.subjects.loading);
  const subjects = useAppSelector((s) => s.subjects.subjects);
  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchSubjects = async () => {
      dispatch(setLoading(true));
      try {
        const res = await fetch("/api/subjects");
        const data = await res.json();
        if (Array.isArray(data)) {
          dispatch(setSubjects(data));
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log("Error useEffect SubjectsList: ", error);
          dispatch(setError(error.message));
        } else {
          console.log("Unknown error: ", error);
        }
        dispatch(setLoading(false));
      }
    };

    fetchSubjects();
  }, [dispatch]);

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
