import { ManagementClient } from 'auth0';

export const auth0Management = new ManagementClient({
  domain: process.env.AUTH0_MANAGEMENT_CLIENT_DOMAIN as string,
  clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID as string,
  clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET as string,
  async fetch(url, init) {
    return await fetch(url, { ...init, cache: 'no-store' });
  },
});

export type User = {
  user_id: string;
  name: string;
  email: string;
  picture?: string;
  password?: string;
  last_login?: string | { [key: string]: unknown };
  logins_count?: number;
};

export async function waitForOperationInLogs({
  userId,
  operationType,
  startTime = new Date(Date.now() - 5000).toISOString(),
  retries = 5,
  delayMs = 1000,
}: {
  userId: string;
  operationType: 'Create a User' | 'Delete a User' | 'Update a User';
  startTime?: string;
  retries?: number;
  delayMs?: number;
}): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const { data: logs } = await auth0Management.logs.getAll({
        q: `type:"sapi" AND description: "${operationType}" AND date:[${startTime} TO *]`,
        sort: 'date:-1',
        per_page: 5,
      });

      const encodedUserId = encodeURIComponent(userId);

      if (
        logs?.some((log) => {
          if (operationType === 'Delete a User') {
            return log?.details?.request?.path?.includes(`/api/v2/users/${encodedUserId}`);
          } else {
            return log?.details?.response?.body?.user_id === userId;
          }
        })
      ) {
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs));
      delayMs *= 2;
    } catch (error) {
      console.error(`Error fetching logs: ${error}`);
    }
  }

  throw new Error(
    `${operationType} operation for user ${userId} not found in logs after ${retries} retries starting from time: ${startTime}.`
  );
}
