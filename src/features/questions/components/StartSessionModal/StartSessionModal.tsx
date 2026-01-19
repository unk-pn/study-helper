"use client";

import { Button, Label, Modal } from "@gravity-ui/uikit";
import c from "./StartSessionModal.module.css";
import { useAppSelector } from "@/hooks/redux";

interface StartSessionModalProps {
  subjectId: string;
  onClose: () => void;
}

export const StartSessionModal = ({
  subjectId,
  onClose,
}: StartSessionModalProps) => {
  const subject = useAppSelector((s) =>
    s.subjects.subjects.find((subject) => subject.id === subjectId),
  );

  if (!subject) return null;

  return (
    <Modal open={true}>
      <div className={c.container}>
        <div className={c.info}>
          <div className={c.titleWrapper}>
            <h1 className={c.title}>{subject.name}</h1>
            <p className={c.subtitle}>Study session</p>
          </div>
          <div className={c.stats}>
            <h3 className={c.statsTitle}>Number of cards</h3>
            <Label>{subject._count.questions}</Label>
          </div>

          <div className={c.instructions}>
            <h3 className={c.instructionsTitle}>Mini instructions</h3>
            <ul className={c.instructionsList}>
              <li className={c.instructionsItem}>View the question on the card</li>
              <li className={c.instructionsItem}>Try to remember the answer</li>
              <li className={c.instructionsItem}>Flip the card over to check yourself</li>
              <li className={c.instructionsItem}>Note how well you remember the answer</li>
            </ul>
          </div>
        </div>

        <div className={c.buttons}>
          <Button href={`/subjects/${subjectId}/cards`} view="action">
            Start
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};
