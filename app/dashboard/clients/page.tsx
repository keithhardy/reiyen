import { Plus } from 'lucide-react';
import Link from 'next/link';

import { columns } from '@/app/dashboard/clients/components/data-table/columns';
import { DataTable } from '@/app/dashboard/clients/components/data-table/data-table';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';

export default async function UsersPage() {
  const clients = await prisma.client.findMany({
    include: {
      address: true,
    },
  });

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Clients</PageHeaderHeading>
        <PageHeaderDescription>
          View and manage all your clients in one place. Download, share, or
          verify your clients with ease.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild variant='outline' size='sm'>
            <Link href='/dashboard/clients/create'>
              <Plus />
              Create Client
            </Link>
          </Button>
        </PageActions>
      </PageHeader>

      <DataTable columns={columns} data={clients} />
    </>
  );
}
