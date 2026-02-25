"use client";

import { TrashBin } from "@gravity-ui/icons";
import { Button, Card, Icon } from "@gravity-ui/uikit";
import c from "./QuestionInput.module.css";
import { useTranslation } from "react-i18next";
import { FormTextArea, FormTextInput } from "@/components";
import { Control, FieldValues } from "react-hook-form";

interface QuestionInputProps<T extends FieldValues> {
  control: Control<T>;
  index: number;
  onDelete: () => void;
}

export const QuestionInput = <T extends FieldValues>({
  control,
  index,
  onDelete,
}: QuestionInputProps<T>) => {
  const { t } = useTranslation();

  return (
    <Card className={c.card}>
      <div className={c.inputs}>
        <FormTextInput
          name={`questions.${index}.name`}
          control={control}
          placeholder={t("questions.question")}
          label={`${index + 1}.`}
          className={c.textInput}
          // hasClear
        />
        <FormTextArea
          name={`questions.${index}.answer`}
          control={control}
          placeholder={t("questions.answer")}
          minRows={3}
          // hasClear
        />
      </div>

      <Button onClick={onDelete} className={c.deleteButton}>
        <Icon data={TrashBin} />
      </Button>
    </Card>
  );
};
