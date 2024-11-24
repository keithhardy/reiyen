import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { DeleteClientForm } from '@/app/dashboard/clients/[id]/delete/form';
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

export default async function DeleteClientPage(props: {
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
        <PageHeaderHeading>Delete</PageHeaderHeading>
        <PageHeaderDescription>
          Are you sure you want to delete this client? This action is permanent.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild variant='outline' size='sm'>
            <Link href={'/dashboard/clients'}>
              <ArrowLeft />
              Back to clients
            </Link>
          </Button>
        </PageActions>
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
          <DeleteClientForm client={client!} />
        </CardContent>
      </Card>
    </>
  );
}
