"use client";

import { useState } from "react";
import { QuestionType } from "../../types/QuestionType";
import c from "./QuestionsList.module.css";
import { EditQuestionModal, Question } from "..";

interface QuestionsListProps {
  questions: QuestionType[];
}

export const QuestionsList = ({ questions }: QuestionsListProps) => {
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null,
  );

  return (
    <div className={c.questionsList}>
      {questions.map((question, index) => (
        <Question
          key={question.id}
          id={question.id}
          name={question.name}
          answer={question.answer}
          index={index}
          onEdit={() => setEditingQuestionId(question.id)}
        />
      ))}

      {editingQuestionId && (
        <EditQuestionModal
          id={editingQuestionId}
          onClose={() => setEditingQuestionId(null)}
        />
      )}
    </div>
  );
};
