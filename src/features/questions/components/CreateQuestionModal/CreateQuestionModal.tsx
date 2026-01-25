"use client";

import { Button, Modal } from "@gravity-ui/uikit";
import c from "./CreateQuestionModal.module.css";
import { QuestionInput } from "./QuestionInput/QuestionInput";
import { useCreateQuestionModal } from "../../hooks/useCreateQuestionModal";

interface CreateQuestionModalProps {
  subjectId: string;
  onClose: () => void;
}

export const CreateQuestionModal = ({
  subjectId,
  onClose,
}: CreateQuestionModalProps) => {
  const {
    t,
    loading,
    questions,
    handleAddQuestion,
    handleUpdateQuestion,
    handleDeleteQuestion,
    handleSave,
    hasEmptyQuestions,
  } = useCreateQuestionModal(subjectId, onClose);

  return (
    <Modal open={true} onClose={onClose}>
      <div className={c.container}>
        <h1 className={c.title}>{t("questions.createQuestion")}</h1>

        <div className={c.questionsList}>
          {questions.map((q, index) => (
            <QuestionInput
              key={q.id}
              index={index + 1}
              name={q.name}
              answer={q.answer}
              onNameUpdate={(name) =>
                handleUpdateQuestion(q.id, { name: name, answer: q.answer })
              }
              onAnswerUpdate={(answer) =>
                handleUpdateQuestion(q.id, { name: q.name, answer: answer })
              }
              onDelete={() => handleDeleteQuestion(q.id)}
            />
          ))}
        </div>

        <Button onClick={handleAddQuestion}>
          {t("questions.addQuestion")}
        </Button>

        <div className={c.buttons}>
          <Button
            view="action"
            onClick={handleSave}
            disabled={hasEmptyQuestions}
            loading={loading}
          >
            {t("utils.save")}
          </Button>
          <Button onClick={onClose}>{t("utils.cancel")}</Button>
        </div>
      </div>
    </Modal>
  );
};
