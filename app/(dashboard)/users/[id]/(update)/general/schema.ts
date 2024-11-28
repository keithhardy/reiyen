import { z } from 'zod';

export const Schema = z.object({
  name: z.string().optional(),
  auth0Id: z.string().optional(),
  email: z.string().optional(),
  id: z.string().optional(),
  picture: z.string().optional(),
});
