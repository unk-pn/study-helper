"use client";
import { useState } from "react";
import c from "./Card.module.css";
import clsx from "clsx";
import { Button, Card as GCard } from "@gravity-ui/uikit";

interface CardProps {
  question: string;
  answer: string;
}

export const Card = ({ question, answer }: CardProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  return (
    <GCard className={c.card}>
      <div className={c.question}>
        <h3>Вопрос: {question}</h3>
        {showAnswer && (
          <h4>Ответ: {answer}</h4>
        )}
      </div>
      <Button
        className={clsx(c.button, { [c.active]: showAnswer })}
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer ? "Скрыть ответ" : "Показать ответ"}
      </Button>
    </GCard>
  );
};
