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
    <div
      className={c.card}
      onClick={() => setShowAnswer(!showAnswer)}
    >
      <div className={clsx(c.cardInner, showAnswer && c.cardFlipped)}>
        <div className={c.cardFront}>{question}</div>

        <div className={c.cardBack}>{answer}</div>
      </div>
    </div>
  );
};
