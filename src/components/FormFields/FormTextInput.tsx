import { TextInput, TextInputProps } from "@gravity-ui/uikit";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

type FormTextInputProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
} & Omit<
  TextInputProps,
  "value" | "onUpdate" | "validationState" | "errorMessage"
>;

export const FormTextInput = <T extends FieldValues>({
  name,
  control,
  ...textInputProps
}: FormTextInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextInput
          {...textInputProps}
          value={field.value || ""}
          onUpdate={field.onChange}
          onBlur={field.onBlur}
          validationState={fieldState.error ? "invalid" : undefined}
          errorMessage={fieldState.error?.message}
          errorPlacement="inside"
        />
      )}
    />
  );
};
