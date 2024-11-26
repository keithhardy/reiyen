import { z } from 'zod';

export const Schema = z.object({
  permissions: z.array(
    z.object({
      id: z.string().optional(),
      userId: z.string().min(1, { message: 'User ID cannot be empty' }),
      permission: z.string().min(1, { message: 'Permission cannot be empty' }),
      clientId: z.string().nullable().optional(),
    })
  ),
});
