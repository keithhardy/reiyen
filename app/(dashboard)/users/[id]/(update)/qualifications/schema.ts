import { z } from 'zod';

export const Schema = z.object({
  id: z.string().optional(),
  auth0Id: z.string().optional(),
  picture: z.string().optional(),
  userId: z.string(),
  awardingBody: z.string(),
  qualification: z.string(),
  qualificationNumber: z.string(),
  awardDate: z.string(),
  certificateUrl: z.string().optional(),
});
