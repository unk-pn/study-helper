"use client";
import { useState } from "react";
import c from "./Card.module.css";
import clsx from "clsx";
import { Card as GCard } from "@gravity-ui/uikit";

interface CardProps {
  question: string;
  answer: string;
}

export const Card = ({ question, answer }: CardProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  return (
    <GCard className={c.card}>
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
    </GCard>
  );
};
