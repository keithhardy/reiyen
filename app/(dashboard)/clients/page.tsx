import { Plus } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import { columns } from '@/app/(dashboard)/clients/components/data-table/columns';
import { DataTable } from '@/app/(dashboard)/clients/components/data-table/data-table';
import { PageActions, PageHeader, PageHeaderDescription, PageHeaderGroup, PageHeaderHeading } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Clients – Reiyen',
};

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    include: {
      address: true,
    },
  });

  return (
    <>
      <PageHeader>
        <PageHeaderGroup>
          <PageHeaderHeading>Clients</PageHeaderHeading>
          <PageHeaderDescription>View, manage, and organize all your clients effortlessly in one centralized platform. Download, share, or verify your clients with ease.</PageHeaderDescription>
        </PageHeaderGroup>
        <PageActions>
          <Button asChild className='w-full sm:w-auto'>
            <Link href='/clients/create'>
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
