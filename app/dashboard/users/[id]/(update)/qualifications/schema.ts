import { z } from 'zod';

export const Schema = z.object({
  userId: z.string(),
  awardingBody: z.string(),
  qualification: z.string(),
  qualificationNumber: z.string(),
  awardDate: z.string(),
  certificateUrl: z.string(),
});
