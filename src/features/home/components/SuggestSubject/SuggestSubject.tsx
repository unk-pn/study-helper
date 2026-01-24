"use client";

import { useEffect, useState } from "react";
import c from "./SuggestSubject.module.css";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks/redux";

type SubjectType = {
  id: string;
  name: string;
};

export const SuggestSubject = () => {
  const { t } = useTranslation();

  const subjects = useAppSelector(s => s.subjects.subjects)

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
      <h1>{t("home.title")}</h1>

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
