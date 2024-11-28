import { z } from 'zod';

export const Schema = z.object({
  name: z.string(),
  auth0Id: z.string(),
  id: z.string(),
  picture: z.string(),
});
