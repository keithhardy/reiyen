import { z } from 'zod';

export const Schema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  logoUrl: z.string().optional(),
  address: z.object({
    streetAddress: z.string(),
    city: z.string(),
    county: z.string(),
    postTown: z.string(),
    postcode: z.string(),
    country: z.string(),
  }),
});
