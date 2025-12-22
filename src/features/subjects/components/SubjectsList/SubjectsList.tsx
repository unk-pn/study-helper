"use client";

import { useEffect, useState } from "react";
import { mockSubjects } from "../../../../../mocks/mock-data";
import { Subject } from "../Subject/Subject";

type SubjectType = {
  id: string;
  name: string;
  userId: string;
  status: string;
  examDate: string;
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
    <div>
      {/* {mockSubjects.map((s) => ( */}
      {subjects.map((s) => (
        <Subject
          key={s.id}
          id={s.id}
          name={s.name}
          status={s.status}
          examDate={s.examDate}
        />
      ))}
      {!subjects.length && "Добавьте свой первый предмет!"}
    </div>
  );
};
