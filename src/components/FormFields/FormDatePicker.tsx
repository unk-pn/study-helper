import { DatePicker, DatePickerProps } from "@gravity-ui/date-components";
import { DateTime } from "@gravity-ui/date-utils";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

type FormDatePickerProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
} & Omit<DatePickerProps, "value" | "onUpdate">;

export const FormDatePicker = <T extends FieldValues>({
  name,
  control,
  ...textInputProps
}: FormDatePickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DatePicker
          {...textInputProps}
          value={(field.value as DateTime) || ""}
          onUpdate={field.onChange}
        />
      )}
    />
  );
};
