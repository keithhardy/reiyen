import { Plus } from 'lucide-react';
import Link from 'next/link';

import { columns } from '@/app/dashboard/users/components/data-table/columns';
import { DataTable } from '@/app/dashboard/users/components/data-table/data-table';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { auth0Management } from '@/lib/auth0-management';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const response = await auth0Management.users.getAll();
  const users = response.data;

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Users</PageHeaderHeading>
        <PageHeaderDescription>
          Manage users with convenient links to view, update, or delete
          accounts. Oversee all user activity and account statuses in one place.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild variant='outline'>
            <Link href='/dashboard/users/create'>
              <Plus />
              Create User
            </Link>
          </Button>
        </PageActions>
      </PageHeader>

      <DataTable columns={columns} data={users} />
    </>
  );
}
