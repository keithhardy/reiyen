import { z } from 'zod';

export const Schema = z.object({
  id: z.string().optional(),
  uprn: z.string().optional(),
});
