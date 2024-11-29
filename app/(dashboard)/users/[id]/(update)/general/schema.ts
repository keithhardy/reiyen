import { z } from 'zod';

export const Schema = z.object({
  id: z.string(),
  auth0Id: z.string(),
  picture: z.string().optional(),
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(55, { message: 'Name must not exceed 55 characters' }),
  email: z.string().email({ message: 'Invalid email format' }),
});
