import { z } from 'zod';

export const Schema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  property: z.object({
    id: z.string().min(1, { message: "Property ID cannot be empty" }),
    client: z.object({
      id: z.string().min(1, { message: "Client ID cannot be empty" }),
    }),
  }),
});
