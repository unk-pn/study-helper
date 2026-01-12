"use client";

import { useEffect, useState } from "react";
import { Subject } from "@/features/subjects/components";
import c from "./SubjectsList.module.css";

type SubjectType = {
  id: string;
  name: string;
  userId: string;
  status: string;
  examDate: string;
  _count: {
    questions: number;
  };
};

export const SubjectsList = () => {
  const [subjects, setSubjects] = useState<SubjectType[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("/api/subjects");
        const data = await res.json();
        if (Array.isArray(data)) {
          setSubjects(data);
        }
      } catch (error) {
        console.log("Error useEffect SubjectsList: ", error);
      }
    };
    fetchSubjects();
  }, []);

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
