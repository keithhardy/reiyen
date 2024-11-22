import { z } from 'zod';

export const Schema = z.object({
  email: z.string().email('Invalid email address.'),

  name: z
    .string()
    .min(5, { message: 'Name should be at least 5 characters long.' })
    .max(50, { message: 'Name should not exceed 50 characters.' }),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[A-Z]/, {
      message: 'Password must include at least one uppercase letter.',
    })
    .regex(/[a-z]/, {
      message: 'Password must include at least one lowercase letter.',
    })
    .regex(/[0-9]/, { message: 'Password must include at least one digit.' })
    .regex(/[!@#$%^&*]/, {
      message:
        'Password must include at least one special character (!@#$%^&*).',
    }),
});
