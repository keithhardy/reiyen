import { z } from 'zod';

export const Schema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  logoUrl: z.string().optional(),
  governingBody: z.string().optional(),
  governingBodyNumber: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  address: z.object({
    id: z.string().optional(),
    streetAddress: z.string().optional(),
    city: z.string().optional(),
    county: z.string().optional(),
    postTown: z.string().optional(),
    postcode: z.string().optional(),
    country: z.string().optional(),
  }),
});
