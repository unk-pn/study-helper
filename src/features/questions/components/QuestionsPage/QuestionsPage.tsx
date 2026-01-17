"use client";

import { QuestionsList } from "..";
import { Button, Card, Label } from "@gravity-ui/uikit";
import c from "./QuestionsPage.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setQuestions } from "@/store/slices/questionsSlice";
import { useEffect } from "react";
import { Loader } from "@/components";
import { formatDate } from "../../../../lib/formatDate";

interface QuestionsPageProps {
  subjectId: string;
}

export const QuestionsPage = ({ subjectId }: QuestionsPageProps) => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((s) => s.questions.questions);
  const loading = useAppSelector((s) => s.questions.loading);
  const subject = useAppSelector((s) =>
    s.subjects.subjects.find((subj) => subj.id === subjectId),
  );

  useEffect(() => {
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

    fetchQuestions();
  }, [dispatch, subjectId]);

  if (!subject) return null;

  if (loading) return <Loader />;

  return (
    <Card className={c.container} view="filled">
      <div className={c.header}>
        <h1 className={c.title}>{subject?.name}</h1>
        <Label size="xs" className={c.label}>
          {formatDate(subject?.examDate)}
        </Label>
      </div>

      <div className={c.buttons}>
        <Button onClick={() => {}} size="l">
          Export PDF
        </Button>
        <Button view="action" onClick={() => {}} size="l">
          Add question
        </Button>
      </div>

      <div className={c.questionsList}>
        <QuestionsList questions={questions} />
      </div>
  {/* {questions.length ? (
        <Accordion size="l">
          {questions.map((q) => (
            <OldQuestion
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
      )} */}
    </Card>
  );
};
