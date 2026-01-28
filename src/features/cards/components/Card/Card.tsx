"use client";

import { useState } from "react";
import c from "./Card.module.css";
import clsx from "clsx";

interface CardProps {
  subjectName?: string;
  question: string;
  answer: string;
}

export const Card = ({ subjectName, question, answer }: CardProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  return (
    <div className={c.card} onClick={() => setShowAnswer(!showAnswer)}>
      <div className={clsx(c.cardInner, showAnswer && c.cardFlipped)}>
        <div className={c.cardFront}>
          {subjectName && <p className={c.subjectName}>{subjectName}</p>}
          <p className={c.cardText}>{question}</p>
        </div>

        <div className={c.cardBack}>
          {subjectName && <p className={c.subjectName}>{subjectName}</p>}
          <p className={c.cardText}>{answer}</p>
        </div>
      </div>
    </div>
  );
};
