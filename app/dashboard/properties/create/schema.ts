import { z } from 'zod';

export const Schema = z.object({
  uprn: z.string().min(1, { message: "UPRN cannot be empty" }),
  occupier: z.string().min(1, { message: "Occupier cannot be empty" }),
  address: z.object({
    streetAddress: z.string().min(1, { message: "Street Address cannot be empty" }),
    city: z.string().min(1, { message: "City cannot be empty" }),
    county: z.string().min(1, { message: "County cannot be empty" }),
    postTown: z.string().min(1, { message: "Post Town cannot be empty" }),
    postcode: z.string().min(1, { message: "Postcode cannot be empty" }),
    country: z.string().optional(),
  }),
  client: z.object({
    id: z.string().min(1, { message: "Client ID cannot be empty" }),
  }),
});
