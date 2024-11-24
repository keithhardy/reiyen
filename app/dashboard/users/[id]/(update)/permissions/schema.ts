import { z } from 'zod';

export const Schema = z.object({
  permissions: z.array(
    z.object({
      id: z.string(),
      userId: z.string(),
      permission: z.string(),
      clientId: z.string().nullable().optional(),
    })
  ),
});
