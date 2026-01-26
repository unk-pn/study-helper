"use client";

import { useState } from "react";
import { QuestionType } from "../../types/QuestionType";
import c from "./QuestionsList.module.css";
import { EditQuestionModal, Question } from "..";
import { useApi } from "@/hooks/useApi";
import { useAppDispatch } from "@/hooks/redux";
import { toast } from "@/lib/toast";
import { deleteQuestion } from "@/store/slices/questionsSlice";
import { t } from "i18next";
import { ConfirmDialog } from "@/components";

interface QuestionsListProps {
  questions: QuestionType[];
}

export const QuestionsList = ({ questions }: QuestionsListProps) => {
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null,
  );
  const [deletingQuestionId, setDeletingQuestionId] = useState<string | null>(
    null,
  );
  const { execute, loading, statusCode } = useApi<QuestionType>("/api/questions", {
    refetchOnMount: false,
  });
  const dispatch = useAppDispatch();

  const deletingQuestion = questions.find((q) => q.id === deletingQuestionId);

  const handleDelete = async () => {
    if (deletingQuestion) {
      const data = await execute({
        method: "DELETE",
        body: { id: deletingQuestion.id },
      });

      if (data) {
        dispatch(deleteQuestion(deletingQuestion.id));
        toast.success(t("questions.toast.delete"));
      } else {
        toast.danger(
          t("questions.toast.deleteError"),
          t("utils.toast.errorDescription", { code: statusCode }),
        );
      }
    }
    setDeletingQuestionId(null);
  };

  return (
    <div className={c.questionsList}>
      {questions.map((q, index) => (
        <Question
          key={q.id}
          id={q.id}
          name={q.name}
          answer={q.answer}
          index={index}
          onEdit={() => setEditingQuestionId(q.id)}
          onDelete={() => setDeletingQuestionId(q.id)}
        />
      ))}

      {editingQuestionId && (
        <EditQuestionModal
          id={editingQuestionId}
          onClose={() => setEditingQuestionId(null)}
        />
      )}

      {deletingQuestion && (
        <ConfirmDialog
          type="question"
          open={!!deletingQuestionId}
          subjectName={deletingQuestion.name}
          onClose={() => setDeletingQuestionId(null)}
          onApply={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};
