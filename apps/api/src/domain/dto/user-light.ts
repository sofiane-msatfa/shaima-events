import { z } from "zod";

export const userLight = z.object({
  id: z.string().uuid(),
  firstname: z.string().min(2).max(255),
  lastname: z.string().min(2).max(255),
  email: z.string().email(),
  deletedAt: z.date().nullable(),
});

export type UserLight = z.infer<typeof userLight>;
