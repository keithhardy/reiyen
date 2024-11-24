import { z } from 'zod';

export const Schema = z.object({
  user_id: z.string(),
  name: z.string(),
});
