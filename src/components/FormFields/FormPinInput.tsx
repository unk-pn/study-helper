"use client";

import { PinInput, PinInputProps } from "@gravity-ui/uikit";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";

type FormPinInputProps<T extends FieldValues> = {
  name: FieldPath<T> | string;
  control: Control<T>;
} & Omit<
  PinInputProps,
  "value" | "onUpdate" | "validationState" | "errorMessage"
>;

export const FormPinInput = <T extends FieldValues>({
  name,
  control,
  ...pinInputProps
}: FormPinInputProps<T>) => {
  return (
    <Controller
      name={name as Path<T>}
      control={control}
      render={({ field }) => (
        <PinInput
          {...pinInputProps}
          value={field.value || []}
          onUpdate={field.onChange}
        />
      )}
    />
  );
};
