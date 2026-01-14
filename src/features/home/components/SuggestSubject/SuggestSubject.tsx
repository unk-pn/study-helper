"use client";

import { useEffect, useState } from "react";
import c from "./SuggestSubject.module.css";
import Link from "next/link";

type SubjectType = {
  id: string;
  name: string;
};

export const SuggestSubject = () => {
  const [subjects, setSubjects] = useState<SubjectType[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/subjects");
        const data = await res.json();
        if (!res.ok) {
          console.log("data fail: ", data.error);
          return;
        }
        setSubjects(data);
        setCurr(data[0]);
      } catch (error) {
        console.log("failed to get subjects: ", error);
      }
    };
    load();
  }, []);

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
  }, [subjects]);

  return (
    <div>
      <h1>What do you want to learn today?</h1>

      <h2>
        {curr && (
          <Link href={`/subjects/${curr.id}`} className={c.link}>
            {curr.name}
          </Link>
        )}
      </h2>
    </div>
  );
};
