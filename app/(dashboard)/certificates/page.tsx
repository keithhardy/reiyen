import { Metadata } from 'next';
import Link from 'next/link';

import { columns } from '@/app/(dashboard)/certificates/components/data-table/columns';
import { DataTable } from '@/app/(dashboard)/certificates/components/data-table/data-table';
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
  title: 'Certificates – Reiyen',
};

export default async function CertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    include: {
      property: {
        include: {
          client: true,
          address: true,
        },
      },
      user: true,
    },
  });

  return (
    <>
      <PageHeader>
        <PageHeaderGroup>
          <PageHeaderHeading>Certificates</PageHeaderHeading>
          <PageHeaderDescription>
            View and manage all your certificates in one place. Download, share,
            or verify your certificates with ease.
          </PageHeaderDescription>
        </PageHeaderGroup>
        <PageActions>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/certificates/create">
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
