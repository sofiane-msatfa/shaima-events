import { z } from "zod";
import { type Result, err, ok } from "neverthrow";

type ZodSchema = z.ZodTypeAny | z.ZodRawShape;

type AssertData<T extends ZodSchema> = T extends z.ZodTypeAny
  ? z.infer<T>
  : T extends z.ZodRawShape
    ? { [K in keyof T]: T[K] extends z.ZodTypeAny ? z.infer<T[K]> : never }
    : never;

type ZodFieldErrors = {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
};

type FieldErrors = {
  [key: string]: string;
};

export function formatFieldErrors(fieldErrors: ZodFieldErrors): FieldErrors {
  return Object.entries(fieldErrors).reduce<FieldErrors>((acc, [key, value]) => {
    if (value) acc[key] = value.join(", ");
    return acc;
  }, {});
}

export function assert<T extends ZodSchema>(
  data: unknown,
  schema: T,
): Result<AssertData<T>, FieldErrors> {
  const schemaClean = schema instanceof z.ZodType ? schema : z.object(schema);
  const assertResult = schemaClean.safeParse(data);

  if (!assertResult.success) {
    const fieldErrors = assertResult.error.flatten().fieldErrors;
    const formattedErrors = formatFieldErrors(fieldErrors);
    return err(formattedErrors);
  }

  return ok(assertResult.data);
}
