"use client"

import { useEffect, useState } from "react";
import { mockSubjects } from "../../../../../mocks/mock-data";
import c from "./SuggestSubject.module.css";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const subjects = mockSubjects.map((s) => ({
  id: s.id,
  name: s.name,
}));

type SubjectType = (typeof subjects)[0];

export const SuggestSubject = () => {
  const data = useSession()
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
    <h2>
      <Link href={`/subjects/${curr.id}`} className={c.link}>
        {curr.name}
      </Link>
      <p>auth: {data.status}</p>
      {data.status === "authenticated" ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <Link href="/auth/signIn">Sign in</Link>
      )}
    </h2>
  );
};