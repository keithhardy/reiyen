import { z } from 'zod';

export const Schema = z.object({
  uprn: z.string(),
  occupier: z.string(),
  address: z.object({
    streetAddress: z.string(),
    city: z.string(),
    county: z.string().optional(),
    postTown: z.string(),
    postcode: z.string(),
    country: z.string().optional(),
  }),
  client: z.object({
    id: z.string().optional(),
  }),
});
