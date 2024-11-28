import { z } from 'zod';

export const Schema = z.object({
  id: z.string().optional(),
  certificateType: z.string().optional(),
});
