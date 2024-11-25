import { Metadata } from 'next';

import { ClientUpdateForm } from '@/app/dashboard/clients/[id]/update/form';
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
  title: 'Update – Clients – Reiyen',
};

export default async function ClientUpdatePage(props: {
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
          <PageHeaderHeading>Update</PageHeaderHeading>
          <PageHeaderDescription>
            Update the client&apos;s profile information, account details, and
            associated data. Make adjustments to ensure the client&apos;s
            information is accurate and up to date.
          </PageHeaderDescription>
        </PageHeaderGroup>
      </PageHeader>

      <Card className='grid grid-cols-2'>
        <CardHeader className='col-span-2 lg:col-span-1'>
          <CardTitle>Client Details</CardTitle>
          <CardDescription>
            Ensure each field is completed accurately.
          </CardDescription>
        </CardHeader>
        <CardContent className='col-span-2 p-6 lg:col-span-1'>
          <ClientUpdateForm client={client!} />
        </CardContent>
      </Card>
    </>
  );
}
