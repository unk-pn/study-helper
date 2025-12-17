"use client";

import { useRouter } from "next/navigation";
import c from "./Subject.module.css";

interface SubjectProps {
  id: string;
  name: string;
  status: string;
  examDate: Date;
}

export const Subject = ({ id, name, status, examDate }: SubjectProps) => {
  const router = useRouter();
  return (
    <div className={c.subject}>
      <h3>{name}</h3>
      <p>Status: {status}</p>
      <p>Date: {examDate.toLocaleDateString("ru-RU")}</p>
      <button onClick={() => router.push(`/subjects/${id}`)}>Questions</button>
    </div>
  );
};
