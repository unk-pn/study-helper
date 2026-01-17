"use client";

import { Question, CreateQuestion } from "@/features/questions/components";
import { Accordion, Button } from "@gravity-ui/uikit";
import c from "./QuestionsPage.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setQuestions } from "@/store/slices/questionsSlice";
import { useEffect } from "react";
import { Loader } from "@/components";

interface QuestionsPageProps {
  subjectId: string;
}

export const QuestionsPage = ({ subjectId }: QuestionsPageProps) => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((s) => s.questions.questions);
  const loading = useAppSelector((s) => s.questions.loading);

  const fetchQuestions = async () => {
    try {
      const res = await fetch(`/api/questions?subjectId=${subjectId}`);
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch questions useEffect");
      dispatch(setQuestions(data));
    } catch (error) {
      console.log("error loading questions: ", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [subjectId]);

  if (loading) return <Loader />;

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
