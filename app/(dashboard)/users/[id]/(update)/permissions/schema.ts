import { z } from 'zod';

export const Schema = z.object({
  permissions: z.array(
    z.object({
      id: z.string().optional(),
      userId: z.string().optional(),
      permission: z.string().optional(),
      clientId: z.string().optional(),
    })
  ),
});
