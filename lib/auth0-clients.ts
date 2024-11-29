import { ManagementClient } from 'auth0';

export const auth0Management = new ManagementClient({
  domain: process.env.AUTH0_MANAGEMENT_CLIENT_DOMAIN!,
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID!,
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET!,
});
