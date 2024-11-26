import { Metadata } from 'next';

import { ClientDeleteForm } from '@/app/clients/[id]/delete/form';
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
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Delete – Clients – Reiyen',
};

export default async function ClientDeletePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const client = await prisma.client.findUnique({
    where: {
      id: params.id,
    },
    include: {
      address: true,
    },
  });

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
        <CardHeader className='col-span-2 lg:col-span-1'>
          <CardTitle>Delete Client</CardTitle>
          <CardDescription>
            Are you sure you want to delete{' '}
            <span className='text-primary'>{client?.name}</span>? This action is
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
