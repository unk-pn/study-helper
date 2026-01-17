import { QuestionType } from "../../types/QuestionType";
import { Question } from "../Question/Question";
import c from "./QuestionsList.module.css";

interface QuestionsListProps {
  questions: QuestionType[];
}

export const QuestionsList = ({ questions }: QuestionsListProps) => {
  return (
    <div className={c.questionsList}>
      {questions.map((question, index) => (
        <Question 
          key={question.id}
          id={question.id}
          name={question.name}
          answer={question.answer}
          index={index}
        />
      ))}
    </div>
  );
};
