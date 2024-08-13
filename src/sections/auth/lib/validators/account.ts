import { z } from "zod";

export const AccountValidator = z.object({
  identifier: z.string().email().or(z.string().min(3)),
  password: z.string().min(6),
});

export type AccountRequest = z.infer<typeof AccountValidator>;
