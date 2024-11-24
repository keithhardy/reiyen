import { z } from 'zod';

export const Schema = z.object({
  id: z.string().min(1, { message: "ID cannot be empty" }),
  name: z.string().min(1, { message: "Name cannot be empty" }),
  propertyId: z.string().min(1, { message: "Property ID cannot be empty" }),
  property: z.object({
    id: z.string().min(1, { message: "Property cannot be empty" }),
    client: z.object({
      id: z.string().min(1, { message: "Client cannot be empty" }),
    }),
  }),
});
