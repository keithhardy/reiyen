import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { PropertyUpdateForm } from '@/app/dashboard/properties/[id]/update/form';
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

export default async function PropertyUpdatePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const clients = await prisma.client.findMany();

  const property = await prisma.property.findUnique({
    where: {
      id: params.id,
    },
    include: {
      client: true,
      address: true,
    },
  });

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Update</PageHeaderHeading>
        <PageHeaderDescription>
          Update the property&apos;s profile information, account details, and
          associated data. Make adjustments to ensure the property&apos;s
          information is accurate and up to date.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild variant='outline' size='sm'>
            <Link href={'/dashboard/properties'}>
              <ArrowLeft />
              Back to properties
            </Link>
          </Button>
        </PageActions>
      </PageHeader>

      <Card className='grid grid-cols-2'>
        <CardHeader className='col-span-2 lg:col-span-1'>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>
            Ensure each field is completed accurately.
          </CardDescription>
        </CardHeader>
        <CardContent className='col-span-2 p-6 lg:col-span-1'>
          <PropertyUpdateForm property={property!} clients={clients!} />
        </CardContent>
      </Card>
    </>
  );
}
