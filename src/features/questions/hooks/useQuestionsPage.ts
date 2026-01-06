import { useEffect, useState } from "react";
import { Question } from "../types/Question";

export const useQuestionsPage = (subjectId: string) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchQuestions = async () => {
    try {
      const res = await fetch(`/api/questions?subjectId=${subjectId}`);
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch questions useEffect");
      setQuestions(data);
    } catch (error) {
      console.log("error loading questions: ", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [subjectId]);

  return {
    questions,
    fetchQuestions,
  };
};
