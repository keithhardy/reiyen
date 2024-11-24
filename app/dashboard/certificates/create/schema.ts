import { z } from 'zod';

export const Schema = z.object({
  name: z.string(),
  property: z.object({
    id: z.string(),
    client: z.object({
      id: z.string(),
    }),
  }),
});
