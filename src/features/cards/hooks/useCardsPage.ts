import { useEffect, useState } from "react";
import { Card } from "../types/Card";
import { randomArray } from "@/lib/randomArray";

export const useCardsPage = (id: string) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/questions?subjectId=${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch cards useEffect");
        const shuffledCards: Card[] = randomArray(data);
        setCards(shuffledCards);

        if (shuffledCards.length > 0) {
          setCurrentCardIndex(0);
        }
      } catch (error) {
        console.log("error loading cards: ", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

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
    cards,
    currentCardIndex,
    correctAnswers,
    incorrectAnswers,
    onDontKnowClick,
    onKnowClick,
    handleStart,
  };
};
