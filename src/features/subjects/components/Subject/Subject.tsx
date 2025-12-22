"use client";

import { useRouter } from "next/navigation";
import c from "./Subject.module.css";

interface SubjectProps {
  id: string;
  name: string;
  status: string;
  examDate: string;
}

export const Subject = ({ id, name, status, examDate }: SubjectProps) => {
  const router = useRouter();
  const formatDate = (date: string) => {
    const [year, month, day] = date.split('T')[0].split('-');
    return `${day}.${month}.${year}`;
  }
  return (
    <div className={c.subject}>
      <h3>{name}</h3>
      <p>Status: {status}</p>
      <p>Date: {formatDate(examDate)}</p>
      <button onClick={() => router.push(`/subjects/${id}`)}>Questions</button>
    </div>
  );
};
