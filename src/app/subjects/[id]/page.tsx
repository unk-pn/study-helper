"use client";

import { useParams } from "next/navigation";
import { QuestionsPage } from "@/features/questions/components";
import c from "./page.module.css";

const QuestionPage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div className={c.page}>
      <QuestionsPage subjectId={id as string} />
    </div>
  );
};

export default QuestionPage;
