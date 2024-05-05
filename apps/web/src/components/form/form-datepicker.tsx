import type { TextFieldProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useFormContext } from "react-hook-form";

type FormDatePickerProps = TextFieldProps & {
  name: string;
};

export function FormDatePicker({ name, ...props }: FormDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          label={props.label}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message,
              ...props,
            },
          }}
        />
      )}
    />
  );
}
