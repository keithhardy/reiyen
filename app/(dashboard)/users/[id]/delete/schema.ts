import { z } from 'zod';

export const Schema = z.object({
  id: z.string(),
  auth0Id: z.string(),
  name: z.string().min(1, { message: 'Name cannot be empty' }),
});
