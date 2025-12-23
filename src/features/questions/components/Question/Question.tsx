import c from './Question.module.css'

interface QuestionProps {
  id: string;
  name: string;
  subjectId: string;
  answer: string | null;
}

export const Question = ({ id, name, subjectId, answer }: QuestionProps) => {
  return (
    <div className={c.question}>
      <h1>{name}</h1>
      <p>Answer: {answer ? answer : "No answer provided"}</p>
    </div>
  );
};
