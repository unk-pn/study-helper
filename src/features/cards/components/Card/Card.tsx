"use client";
import { useState } from "react";
import c from "./Card.module.css";
import clsx from "clsx";

interface CardProps {
  question: string;
  answer: string;
}

export const Card = ({ question, answer }: CardProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  return (
    <div className={c.card}>
      <div className={c.question}>{question}</div>
      <button
        className={clsx(c.button, { [c.active]: showAnswer })}
        onClick={() => setShowAnswer(!showAnswer)}
      >
        Show answer
      </button>
      <div className={clsx(c.answer, { [c.hidden]: !showAnswer })}>
        {answer}
      </div>
    </div>
  );
};
