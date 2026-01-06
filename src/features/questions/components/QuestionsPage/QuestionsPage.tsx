"use client";

import { useEffect, useState } from "react";
import { Question, CreateQuestion } from "@/features/questions/components";
import { Accordion, Button } from "@gravity-ui/uikit";
import c from "./QuestionsPage.module.css";

interface Question {
  id: string;
  name: string;
  subjectId: string;
  answer: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface QuestionsPageProps {
  subjectId: string;
}

export const QuestionsPage = ({ subjectId }: QuestionsPageProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/questions?subjectId=${subjectId}`);
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch questions useEffect");
        setQuestions(data);
      } catch (error) {
        console.log("error loading questions: ", error);
      }
    };
    load();
  }, []);

  return (
    <div>
      <div className={c.buttons}>
        <Button href={"/subjects"}>Back</Button>
        <Button href={`/subjects/${subjectId}/cards`} view="action">
          Cards
        </Button>
        <CreateQuestion subjectId={subjectId} />
      </div>
      {questions.length ? (
        <Accordion size="l">
          {questions.map((q) => (
            <Question
              key={q.id}
              id={q.id}
              name={q.name}
              subjectId={q.subjectId}
              answer={q.answer}
            />
          ))}
        </Accordion>
      ) : (
        <p>No questions yet</p>
      )}
    </div>
  );
};
