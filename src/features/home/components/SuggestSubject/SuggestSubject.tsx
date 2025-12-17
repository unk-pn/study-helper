"use client"

import { useEffect, useState } from "react";
import { mockSubjects } from "../../../../../mocks/mock-data";
import c from "./SuggestSubject.module.css";

const subjects = mockSubjects.map((s) => ({
  id: s.id,
  name: s.name,
}));

type SubjectType = (typeof subjects)[0];

export const SuggestSubject = () => {
  const [curr, setCurr] = useState<SubjectType>(subjects[0]);
  useEffect(() => {
    const changeSubject = setInterval(() => {
      setCurr((prev) => {
        const currentSubject = subjects.findIndex((s) => s.id === prev.id);
        const nextIndex = (currentSubject + 1) % subjects.length;
        return subjects[nextIndex];
      });
    }, 1500);

    return () => {
      clearInterval(changeSubject);
    };
  }, []);

  return (
    <div>
      <a href={`/subjects/${curr.id}`} className={c.link}>
        {curr.name}
      </a>
    </div>
  );
};