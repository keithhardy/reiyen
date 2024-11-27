import { z } from 'zod';

export const Schema = z.object({
  userId: z.string().min(1, { message: 'User ID cannot be empty' }),
  awardingBody: z.string().min(1, { message: 'Awarding Body cannot be empty' }),
  qualification: z.string().min(1, { message: 'Qualification cannot be empty' }),
  qualificationNumber: z.string().min(1, {
    message: 'Qualification Number cannot be empty',
  }),
  awardDate: z.string().min(1, { message: 'Award Date cannot be empty' }),
  certificateUrl: z.string().min(1, { message: 'Certificate URL cannot be empty' }),
});
