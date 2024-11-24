import { z } from 'zod';

export const Schema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  logoUrl: z.string().optional(),
  addressId: z.string().optional(),
  address: z.object({
    streetAddress: z.string().optional(),
    city: z.string().optional(),
    county: z.string().optional(),
    postTown: z.string().optional(),
    postcode: z.string().optional(),
    country: z.string().optional(),
  }),
});
