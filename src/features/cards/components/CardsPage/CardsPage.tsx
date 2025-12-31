"use client";

import { useEffect, useState } from "react";
import c from "./CardsPage.module.css";
import { Card } from "../Card/Card";
import { Nav } from "../Nav/Nav";

interface CardsPageProps {
  id: string;
}

interface Card {
  id: string;
  name: string;
  answer: string;
  subjectId: string;
  createdAt: Date;
  updatedAt: Date;
}

function randomArray<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const CardsPage = ({ id }: CardsPageProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/questions?subjectId=${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch cards useEffect");
        setCards(randomArray(data));
      } catch (error) {
        console.log("error loading cards: ", error);
      }
    };
    load();
  }, []);

  const onDontKnowClick = () => {
    setIncorrectAnswers((i) => i + 1);
    setCurrentCardIndex((prev) => {
      if (prev === null) return null;
      if (prev >= cards.length - 1) return null;
      return prev + 1;
    });
  };

  const onKnowClick = () => {
    setCorrectAnswers((c) => c + 1);
    setCurrentCardIndex((prev) => {
      if (prev === null) return null;
      if (prev >= cards.length - 1) return null;
      return prev + 1;
    });
  };

  const handleStart = () => {
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setCurrentCardIndex(0);
    setCurrentCardIndex(0);
  };

  if (currentCardIndex === null) {
    return (
      <div className={c.container}>
        {cards.length === 0 ? (
          <div>No cards available.</div>
        ) : cards.length > 0 &&
          correctAnswers === 0 &&
          incorrectAnswers === 0 ? (
          <button className={c.startButton} onClick={handleStart}>
            Start
          </button>
        ) : (
          <div>
            <div>Session ended!</div>
            <div>Correct answers: {correctAnswers}</div>
            <div>Incorrect answers: {incorrectAnswers}</div>
            <button className={c.startButton} onClick={handleStart}>
              Start Again
            </button>
          </div>
        )}
      </div>
    );
  }
  return (
    <div>
      <div>
        <Card
          key={cards[currentCardIndex].id}
          question={cards[currentCardIndex].name}
          answer={cards[currentCardIndex].answer}
        />
        <Nav onKnowClick={onKnowClick} onDontKnowClick={onDontKnowClick} />
      </div>
    </div>
  );
};
