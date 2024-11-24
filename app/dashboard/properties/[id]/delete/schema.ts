import { z } from 'zod';

export const Schema = z.object({
  id: z.string().min(1, { message: "ID cannot be empty" }),
  uprn: z.string().min(1, { message: "UPRN cannot be empty" }),
});
