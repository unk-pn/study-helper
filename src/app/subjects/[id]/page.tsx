"use client";

import { mockQuestions } from "../../../../mocks/mock-data";
import { useParams } from "next/navigation";
import { Question } from "@/features/subjects/components/Question/Question";

const QuestionPage = () => {
  const params = useParams();
  const { id } = params;
  const questions = mockQuestions.filter((q) => q.subjectId === id);

  return (
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
  );
};

export default QuestionPage;
