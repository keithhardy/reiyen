import { z } from 'zod';

export const Schema = z.object({
  id: z.string(),
  uprn: z.string(),
  occupier: z.string(),
  address: z.object({
    streetAddress: z.string(),
    city: z.string(),
    county: z.string(),
    postTown: z.string(),
    postcode: z.string(),
    country: z.string(),
  }),
  client: z.object({
    id: z.string(),
  }),
});
