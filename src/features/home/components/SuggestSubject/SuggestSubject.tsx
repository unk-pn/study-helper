"use client";

import { useEffect, useState } from "react";
import c from "./SuggestSubject.module.css";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

type SubjectType = {
  id: string;
  name: string;
};

export const SuggestSubject = () => {
  const { data: session } = useSession();
  const data = useSession();
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
        setCurr(data[0])
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

  if (!curr) return (
    <Link href="/auth/signIn">
      Sign In
    </Link>
  );

  return (
    <h2>
      <Link href={`/subjects/${curr.id}`} className={c.link}>
        {curr.name}
      </Link>
      <p>name: {session?.user.name}</p>
      <p>email: {session?.user.email}</p>
      {data.status === "authenticated" ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <Link href="/auth/signIn">Sign in</Link>
      )}
    </h2>
  );
};
