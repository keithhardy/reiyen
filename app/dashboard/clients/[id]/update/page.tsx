import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

import { UpdateClientForm } from './form';

export default async function ClientUpdatePage({
  params,
}: {
  params: { id: string };
}) {
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
        <PageHeaderHeading>Update</PageHeaderHeading>
        <PageHeaderDescription>
          Update the client&apos;s profile information, account details, and
          associated data. Make adjustments to ensure the client&apos;s
          information is accurate and up to date.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild variant='outline' size='sm'>
            <Link href={'/dashboard/clients/'}>
              <ArrowLeft />
              Back to clients
            </Link>
          </Button>
        </PageActions>
      </PageHeader>

      <Card className='grid grid-cols-2'>
        <CardHeader className='col-span-2 lg:col-span-1'>
          <CardTitle>Client Details</CardTitle>
          <CardDescription>
            Ensure each field is completed accurately.
          </CardDescription>
        </CardHeader>
        <CardContent className='col-span-2 p-6 lg:col-span-1'>
          <UpdateClientForm client={client!} />
        </CardContent>
      </Card>
    </>
  );
}
