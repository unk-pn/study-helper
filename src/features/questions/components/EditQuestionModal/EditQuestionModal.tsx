import { Button, Modal, TextArea, TextInput } from "@gravity-ui/uikit";
import c from "./EditQuestionModal.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useState } from "react";
import { updateQuestion } from "@/store/slices/questionsSlice";

interface EditQuestionModalProps {
  id: string;
  onClose: () => void;
}

export const EditQuestionModal = ({ id, onClose }: EditQuestionModalProps) => {
  const dispatch = useAppDispatch();
  const question = useAppSelector((s) =>
    s.questions.questions.find((q) => q.id === id),
  );
  const [name, setName] = useState(question?.name || "");
  const [answer, setAnswer] = useState(question?.answer || "");

  const handleSave = async () => {
    try {
      const res = await fetch("/api/questions/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name: name.trim(),
          answer: answer.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to update question: " + data.message);
      }
      dispatch(updateQuestion(data));
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error updating question: ", error);
      } else {
        console.log("Unknown error: ", error);
      }
    }
  };

  return (
    <Modal open={true} onClose={onClose} disableBodyScrollLock={true}>
      <div className={c.editForm} onClick={(e) => e.stopPropagation()}>
        <h1 className={c.title}>Editing Question</h1>
        <TextInput
          size="m"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={c.textInput}
          placeholder="Question"
          hasClear
        />
        <TextArea
          size="m"
          value={answer}
          minRows={3}
          onChange={(e) => setAnswer(e.target.value)}
          className={c.input}
          placeholder="Answer"
          hasClear
        />

        <div className={c.buttons}>
          <Button onClick={handleSave} view="action">
            Сохранить
          </Button>
          <Button onClick={() => onClose()}>Отмена</Button>
        </div>
      </div>
    </Modal>
  );
};
