"use client";

import { useParams } from "next/navigation";
import { QuestionsPage } from '../../../features/questions/components/QuestionsPage/QuestionsPage';

const QuestionPage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <QuestionsPage subjectId={id as string} />
    </div>
  );
};

export default QuestionPage;
