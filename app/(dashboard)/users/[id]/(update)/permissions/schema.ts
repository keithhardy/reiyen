import { z } from 'zod';

export const Schema = z.object({
  permissions: z.array(
    z.object({
      id: z.string().optional(),
      userId: z.string(),
      permission: z.string(),
      clientId: z.string().nullable(),
    })
  ),
});
