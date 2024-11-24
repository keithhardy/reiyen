import { z } from 'zod';

export const Schema = z.object({
  id: z.string(),
  name: z.string(),
  propertyId: z.string(),
  property: z.object({
    id: z.string(),
    client: z.object({
      id: z.string(),
    }),
  }),
});
