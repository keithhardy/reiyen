import { z } from 'zod';

export const Schema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  logoUrl: z.string().optional(),
  address: z.object({
    streetAddress: z.string(),
    city: z.string(),
    county: z.string().optional(),
    postTown: z.string(),
    postcode: z.string(),
    country: z.string().optional(),
  }),
});
