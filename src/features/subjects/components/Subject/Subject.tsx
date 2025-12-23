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
    const [year, month, day] = date.split("T")[0].split("-");
    return `${day}.${month}.${year}`;
  };
  const handleDelete = async () => {
    try {
      const res = await fetch("/api/subjects", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("res not ok: ", data.error);
        return;
      }
      window.location.reload();
    } catch (error) {
      console.log("error deleting subject: ", error);
    }
  };
  return (
    <div className={c.subject}>
      <h3>{name}</h3>
      <p>Статус: {status}</p>
      <p>Дата: {formatDate(examDate)}</p>
      <button onClick={() => router.push(`/subjects/${id}`)}>Вопросы</button>
      <button onClick={handleDelete}>Удалить</button>
    </div>
  );
};
