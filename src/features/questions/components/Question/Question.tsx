import c from "./Question.module.css";

interface QuestionProps {
  id: string;
  name: string;
  subjectId: string;
  answer: string | null;
}

export const Question = ({ id, name, subjectId, answer }: QuestionProps) => {
  const handleDelete = async () => {
    try {
      const res = await fetch("/api/questions", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("res not ok: ", data.error);
        return;
      }
      window.location.reload();
    } catch (error) {
      console.log("error deleting question: ", error);
    }
  };

  return (
    <div className={c.question}>
      <h1>{name}</h1>
      <p>Answer: {answer ? answer : "No answer provided"}</p>
      <button onClick={handleDelete}>Удалить</button>
    </div>
  );
};
