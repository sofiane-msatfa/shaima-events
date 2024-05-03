import { z } from "zod";

export const registerRequestSchema = z.object({
  firstname: z.string().min(2).max(255),
  lastname: z.string().min(2).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export type RegisterRequest = z.infer<typeof registerRequestSchema>;
