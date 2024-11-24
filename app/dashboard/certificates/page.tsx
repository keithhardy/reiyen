import { Plus } from 'lucide-react';
import Link from 'next/link';

import { columns } from '@/app/dashboard/certificates/components/data-table/columns';
import { DataTable } from '@/app/dashboard/certificates/components/data-table/data-table';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';

export default async function UsersPage() {
  const certificates = await prisma.certificate.findMany({
    include: {
      property: {
        include: {
          address: true,
          client: true,
        },
      },
    },
  });

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Certificates</PageHeaderHeading>
        <PageHeaderDescription>
          View and manage all your certificates in one place. Download, share,
          or verify your certificates with ease.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild variant='outline' size='sm'>
            <Link href='/dashboard/certificates/create'>
              <Plus />
              Create Certificate
            </Link>
          </Button>
        </PageActions>
      </PageHeader>

      <DataTable columns={columns} data={certificates} />
    </>
  );
}
