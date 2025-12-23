"use client";

import { useEffect, useState } from "react";
import { Question } from "../Question/Question";
import { CreateQuestion } from "../CreateQuestion/CreateQuestion";

interface Question {
  id: string;
  name: string;
  subjectId: string;
  answer: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Subject {
  id: string;
  name: string;
  status: string;
  examDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface QuestionsPageProps {
  // questions: Question[];
  // subject: Subject;
  subjectId: string;
}

export const QuestionsPage = ({ subjectId }: QuestionsPageProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/questions?subjectId=${subjectId}`);
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch questions useEffect")
        setQuestions(data);
      } catch (error) {
        console.log("error loading questions: ", error);
      }
    };
    load();
  }, []);

  return (
    <div>
      <a href={"/subjects"}>Back</a>
      <br />
      <CreateQuestion subjectId={subjectId} />
      <div>
        {questions.map((q) => (
          <Question
            key={q.id}
            id={q.id}
            name={q.name}
            subjectId={q.subjectId}
            answer={q.answer}
          />
        ))}
      </div>
    </div>
  );
};
