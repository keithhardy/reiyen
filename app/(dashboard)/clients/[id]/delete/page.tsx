import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ClientDeleteForm } from '@/app/(dashboard)/clients/[id]/delete/form';
import { prisma } from '@/lib/prisma';

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderGroup,
  PageHeaderHeading,
} from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Delete – Clients – Reiyen',
};

export async function generateStaticParams() {
  const clients = await prisma.client.findMany({
    select: { id: true },
  });

  return clients.map((client) => ({ id: client.id }));
}

export default async function ClientDeletePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const client = await prisma.client.findUnique({
    where: {
      id: (await params).id,
    },
    include: {
      address: true,
    },
  });

  if (!client) {
    notFound();
  }

  return (
    <>
      <PageHeader>
        <PageHeaderGroup>
          <PageHeaderHeading>Delete</PageHeaderHeading>
          <PageHeaderDescription>
            Are you sure you want to delete this client? This action is
            permanent.
          </PageHeaderDescription>
        </PageHeaderGroup>
      </PageHeader>

      <Card>
        <CardHeader className="col-span-2 lg:col-span-1">
          <CardTitle>Delete Client</CardTitle>
          <CardDescription>
            Are you sure you want to delete{' '}
            <span className="text-primary">{client?.name}</span>? This action is
            permanent, and all data associated with this client will be lost and
            cannot be recovered.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ClientDeleteForm client={client!} />
        </CardContent>
      </Card>
    </>
  );
}
