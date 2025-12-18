"use client";

import { mockQuestions, mockSubjects } from "../../../../mocks/mock-data";
import { useParams } from "next/navigation";
import { Question } from "@/features/subjects/components/Question/Question";

const QuestionPage = () => {
  const params = useParams();
  const { id } = params;
  const questions = mockQuestions.filter((q) => q.subjectId === id);
  const subject = mockSubjects.find((s) => s.id === id);

  if (!subject) return;
  return (
    <div>
      <a href={"/subjects"}>Back</a>
      <h1>Subject: {subject.name}</h1>
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

export default QuestionPage;
