"use client";

import c from "./CardsPage.module.css";
import { Card, Nav } from "@/features/cards/components";
import { Card as GCard, Button, Label } from "@gravity-ui/uikit";
import { useCardsPage } from "../../hooks/useCardsPage";
import { Loader } from "@/components";
import { useAppSelector } from "@/hooks/redux";
import { CircleProgress } from "./CircleProgress/CircleProgress";
import { useTranslation } from "react-i18next";

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

  const subject = useAppSelector((s) =>
    s.subjects.subjects.find((subj) => subj.id === id),
  );
  const { t } = useTranslation();

  if (currentCardIndex === null) {
    return (
      <div className={c.container}>
        {cards.length === 0 ? (
          <Loader />
        ) : (
          <GCard className={c.results}>
            <div className={c.resultsContent}>
              <div className={c.resultsText}>
                <h1 className={c.sessionEnded}>{t("cards.sessionEnded")}</h1>
                <div className={c.correctAnswers}>
                  <h4>{t("cards.alreadyKnow")}</h4>
                  <Label theme="success">{correctAnswers}</Label>
                </div>
                <div className={c.incorrectAnswers}>
                  <h4>{t("cards.dontKnowYet")}</h4>
                  <Label theme="warning">{incorrectAnswers}</Label>
                </div>
              </div>

              <div className={c.resultsStats}>
                <CircleProgress
                  progress={(correctAnswers / cards.length) * 100}
                />
              </div>
            </div>

            <div className={c.buttons}>
              <Button
                size="l"
                view="action"
                className={c.startButton}
                onClick={handleStart}
              >
                {t("cards.startAgain")}
              </Button>
              <Button size="l" href={`/subjects/${id}`}>
                {t("cards.backToQuestions")}
              </Button>
            </div>
          </GCard>
        )}
      </div>
    );
  }

  return (
    <div className={c.container}>
      <p>
        {currentCardIndex + 1} / {cards.length}
      </p>
      <Card
        subjectName={subject?.name}
        key={cards[currentCardIndex].id}
        question={cards[currentCardIndex].name}
        answer={cards[currentCardIndex].answer}
      />
      <Nav onKnowClick={onKnowClick} onDontKnowClick={onDontKnowClick} />
    </div>
  );
};
