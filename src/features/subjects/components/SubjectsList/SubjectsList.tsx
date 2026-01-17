"use client";

import { useEffect, useState } from "react";
import { Subject } from "@/features/subjects/components";
import c from "./SubjectsList.module.css";
import { SubjectType } from "../../types/SubjectType";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  setError,
  setLoading,
  setSubjects,
} from "@/store/slices/subjectsSlice";
import { Loader } from "@/components";

export const SubjectsList = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((s) => s.subjects.loading);
  const subjects = useAppSelector((s) => s.subjects.subjects);

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
  }, []);

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
        />
      ))}
      {!subjects.length && "Добавьте свой первый предмет!"}
    </div>
  );
};
