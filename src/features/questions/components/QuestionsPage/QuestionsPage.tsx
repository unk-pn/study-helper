"use client";

import {
  QuestionsList,
  CreateQuestionModal,
  StartSessionModal,
  ExportPDFButton,
} from "..";
import { Button, Card, Label } from "@gravity-ui/uikit";
import c from "./QuestionsPage.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setQuestions } from "@/store/slices/questionsSlice";
import { useEffect, useState } from "react";
import { Loader } from "@/components";
import { formatDate } from "../../../../lib/formatDate";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useApi } from "@/hooks/useApi";

interface QuestionsPageProps {
  subjectId: string;
}

export const QuestionsPage = ({ subjectId }: QuestionsPageProps) => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((s) => s.questions.questions);
  const subject = useAppSelector((s) =>
    s.subjects.subjects.find((subj) => subj.id === subjectId),
  );
  const router = useRouter();
  const [createSubjectOpen, setCreateSubjectOpen] = useState(false);
  const [startSessionOpen, setStartSessionOpen] = useState(false);
  const { t } = useTranslation();
  const { data, loading, statusCode } = useApi(
    `/api/questions?subjectId=${subjectId}`,
  );

  useEffect(() => {
    if ([403, 404].includes(statusCode || 0)) {
      router.push("/subjects");
      return;
    }
  }, [router, statusCode]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      dispatch(setQuestions(data));
    }
  }, [dispatch, data]);

  if (!subject) return null;

  if (loading) return <Loader />;

  return (
    <Card className={c.container} view="filled">
      <div className={c.header}>
        <h1 className={c.title}>{subject?.name}</h1>
        <Label size="xs">{formatDate(subject?.examDate)}</Label>
      </div>

      <div className={c.buttons}>
        <ExportPDFButton subjectId={subjectId} />
        <Button
          view="action"
          onClick={() => setCreateSubjectOpen(true)}
          size="l"
        >
          {t("questions.addQuestion")}
        </Button>
      </div>

      <QuestionsList questions={questions} />

      {questions.length > 0 && (
        <Button
          view="action"
          onClick={() => setStartSessionOpen(true)}
          disabled={questions.length === 0}
        >
          {t("questions.startStudying")}
        </Button>
      )}

      {createSubjectOpen && (
        <CreateQuestionModal
          subjectId={subjectId}
          onClose={() => setCreateSubjectOpen(false)}
        />
      )}

      {startSessionOpen && (
        <StartSessionModal
          subjectId={subjectId}
          onClose={() => setStartSessionOpen(false)}
        />
      )}
    </Card>
  );
};
