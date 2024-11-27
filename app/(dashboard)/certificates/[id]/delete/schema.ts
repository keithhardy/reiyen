import { z } from 'zod';

export const Schema = z.object({
  id: z.string().min(1, { message: 'ID cannot be empty' }),
  certificateType: z.string().min(1, { message: 'Type cannot be empty' }),
});
