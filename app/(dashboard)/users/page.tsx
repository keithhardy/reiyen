import { Metadata } from 'next';
import Link from 'next/link';

import { columns } from '@/app/(dashboard)/users/components/data-table/columns';
import { DataTable } from '@/app/(dashboard)/users/components/data-table/data-table';
import { prisma } from '@/lib/prisma';
import { Plus } from 'lucide-react';

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderGroup,
  PageHeaderHeading,
} from '@/components/page-header';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Users – Reiyen',
};

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <>
      <PageHeader>
        <PageHeaderGroup>
          <PageHeaderHeading>Users</PageHeaderHeading>
          <PageHeaderDescription>
            Manage users with convenient links to view, update, or delete
            accounts. Oversee all user activity and account statuses in one
            place.
          </PageHeaderDescription>
        </PageHeaderGroup>

        <PageActions>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/users/create">
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
