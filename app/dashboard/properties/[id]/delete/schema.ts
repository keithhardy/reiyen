import { z } from 'zod';

export const Schema = z.object({
  id: z.string(),
  uprn: z.string(),
});
