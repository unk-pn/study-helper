"use client";

import { Question, CreateQuestion } from "@/features/questions/components";
import { Accordion, Button } from "@gravity-ui/uikit";
import c from "./QuestionsPage.module.css";
import { useQuestionsPage } from "../../hooks/useQuestionsPage";

interface QuestionsPageProps {
  subjectId: string;
}

export const QuestionsPage = ({ subjectId }: QuestionsPageProps) => {
  const { questions } = useQuestionsPage(subjectId);

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
