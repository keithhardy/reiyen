import { Plus } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import { columns } from '@/app/dashboard/properties/components/data-table/columns';
import { DataTable } from '@/app/dashboard/properties/components/data-table/data-table';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Properties – Reiyen',
};

export default async function PropertiesPage() {
  const properties = await prisma.property.findMany({
    include: {
      client: true,
      address: true,
    },
  });

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Properties</PageHeaderHeading>
        <PageHeaderDescription>
          View and manage all your properties in one place. Download, share, or
          verify your properties with ease.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild variant='outline' size='sm'>
            <Link href='/dashboard/properties/create'>
              <Plus />
              Create Property
            </Link>
          </Button>
        </PageActions>
      </PageHeader>

      <DataTable columns={columns} data={properties} />
    </>
  );
}
