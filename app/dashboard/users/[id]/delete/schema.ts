import { z } from 'zod';

export const Schema = z.object({
  user_id: z.string().min(1, { message: "User ID cannot be empty" }),
  name: z.string().min(1, { message: "Name cannot be empty" }),
});
