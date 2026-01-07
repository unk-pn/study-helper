"use client";

import c from "./CardsPage.module.css";
import { Card, Nav } from "@/features/cards/components";
import { Button } from "@gravity-ui/uikit";
import { useCardsPage } from "../../hooks/useCardsPage";

interface CardsPageProps {
  id: string;
}

export const CardsPage = ({ id }: CardsPageProps) => {
  const {
    cards,
    currentCardIndex,
    correctAnswers,
    incorrectAnswers,
    onDontKnowClick,
    onKnowClick,
    handleStart,
  } = useCardsPage(id);

  if (currentCardIndex === null) {
    return (
      <div className={c.container}>
        {cards.length === 0 ? (
          <p className={c.noCards}>No cards available.</p>
        ) : cards.length > 0 &&
          correctAnswers === 0 &&
          incorrectAnswers === 0 ? (
          <Button size="l" className={c.startButton} onClick={handleStart}>
            Start
          </Button>
        ) : (
          <div className={c.results}>
            <h2 className={c.sessionEnded}>Session ended!</h2>
            <h4 className={c.correctAnswers}>
              Correct answers: {correctAnswers}
            </h4>
            <h4 className={c.incorrectAnswers}>
              Incorrect answers: {incorrectAnswers}
            </h4>
            <Button
              size="l"
              view="action"
              className={c.startButton}
              onClick={handleStart}
            >
              Start Again
            </Button>
            <Button size="l" href={`/subjects/${id}`}>
              Back to Questions
            </Button>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={c.container}>
      <Card
        key={cards[currentCardIndex].id}
        question={cards[currentCardIndex].name}
        answer={cards[currentCardIndex].answer}
      />
      <Nav onKnowClick={onKnowClick} onDontKnowClick={onDontKnowClick} />
    </div>
  );
};
