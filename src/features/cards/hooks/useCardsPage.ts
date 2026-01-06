import { useEffect, useState } from "react";
import { Card } from "../types/Card";
import { randomArray } from "@/lib/randomArray";

export const useCardsPage = (id: string) => {
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

  return {
    cards,
    currentCardIndex,
    correctAnswers,
    incorrectAnswers,
    onDontKnowClick,
    onKnowClick,
    handleStart,
  };
};
