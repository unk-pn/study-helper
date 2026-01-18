"use client";

import { Button, Modal } from "@gravity-ui/uikit";
import c from "./CreateQuestionModal.module.css";
import { useState } from "react";

interface CreateQuestionModalProps {
  onClose: () => void;
}

interface QuestionInputType {
  name: string;
  answer: string;
}

export const CreateQuestionModal = ({ onClose }: CreateQuestionModalProps) => {
  const [questions, setQuestions] = useState<QuestionInputType[]>([]);

  return (
    <Modal open={true} onClose={onClose}>
      <h1 className={c.title}>Create Questions</h1>

      <div>{}</div>

      <Button view="action">Создать</Button>
    </Modal>
  );
};
