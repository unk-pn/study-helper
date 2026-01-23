import { useEffect, useState } from "react";
import { Card } from "../types/Card";
import { randomArray } from "@/lib/randomArray";
import { useApi } from "@/hooks/useApi";

export const useCardsPage = (id: string) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const { data, loading, error } = useApi(`/api/questions?subjectId=${id}`);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const shuffledCards: Card[] = randomArray(data);
      setCards(shuffledCards);
      if (shuffledCards.length > 0) {
        setCurrentCardIndex(0);
      }
    }
  }, [data]);

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
  };

  return {
    loading,
    error,
    cards,
    currentCardIndex,
    correctAnswers,
    incorrectAnswers,
    onDontKnowClick,
    onKnowClick,
    handleStart,
  };
};
