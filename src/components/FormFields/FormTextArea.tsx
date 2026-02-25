"use client";

import { TextArea, TextAreaProps } from "@gravity-ui/uikit";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

type FormTextAreaProps<T extends FieldValues> = {
  name: FieldPath<T> | string;
  control: Control<T>;
} & Omit<
  TextAreaProps,
  "value" | "onUpdate" | "validationState" | "errorMessage"
>;

export const FormTextArea = <T extends FieldValues>({
  name,
  control,
  ...textAreaProps
}: FormTextAreaProps<T>) => {
  const { t } = useTranslation();
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <TextArea
          {...textAreaProps}
          value={field.value || ""}
          onUpdate={field.onChange}
          onBlur={field.onBlur}
          validationState={fieldState.error ? "invalid" : undefined}
          errorMessage={
            fieldState.error
              ? t(
                  (fieldState.error.message ||
                    "utils.toast.unknownError") as never,
                )
              : undefined
          }
          errorPlacement="inside"
        />
      )}
    />
  );
};
