import { z } from 'zod';

export const Schema = z.object({
  name: z.string().min(1, { message: 'Name cannot be empty' }),
  email: z.string().email({ message: 'Must be an email' }),
  phone: z.string().min(1, { message: 'Phone cannot be empty' }),
  logoUrl: z.string().optional(),
  address: z.object({
    streetAddress: z
      .string()
      .min(1, { message: 'Street Address cannot be empty' }),
    city: z.string().min(1, { message: 'City cannot be empty' }),
    county: z.string().min(1, { message: 'County cannot be empty' }),
    postTown: z.string().min(1, { message: 'Post Town cannot be empty' }),
    postcode: z.string().min(1, { message: 'Postcode cannot be empty' }),
    country: z.string().optional(),
  }),
});
