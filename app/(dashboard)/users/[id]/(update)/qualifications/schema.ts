import { z } from 'zod';

export const Schema = z.object({
  id: z.string().optional(),
  auth0Id: z.string().optional(),
  picture: z.string().optional(),
  userId: z.string().optional(),
  awardingBody: z.string().optional(),
  qualification: z.string().optional(),
  qualificationNumber: z.string().optional(),
  awardDate: z.string().optional(),
  certificateUrl: z.string().optional(),
});
