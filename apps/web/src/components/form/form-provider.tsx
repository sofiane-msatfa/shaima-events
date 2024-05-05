import type { UseFormReturn, FieldValues } from "react-hook-form";
import { FormProvider as Form } from "react-hook-form";

interface FormProviderProps<T extends FieldValues> {
  children: React.ReactNode;
  methods: UseFormReturn<T>;
  onSubmit?: VoidFunction;
}

export function FormProvider<T extends FieldValues>({
  children,
  onSubmit,
  methods,
}: FormProviderProps<T>) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}
