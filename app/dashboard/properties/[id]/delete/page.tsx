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

import { PropertyDeleteForm } from './form';

export default async function UserDeletePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const property = await prisma.property.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Delete</PageHeaderHeading>
        <PageHeaderDescription>
          Are you sure you want to delete this property? This action is
          permanent.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild variant='outline' size='sm'>
            <Link href={`/properties/${params.id}`}>
              <ArrowLeft />
              Back to {property!.uprn}
            </Link>
          </Button>
        </PageActions>
      </PageHeader>

      <Card>
        <CardHeader className='col-span-2 lg:col-span-1'>
          <CardTitle>Delete Property</CardTitle>
          <CardDescription>
            Are you sure you want to delete{' '}
            <span className='text-primary'>{property?.uprn}</span>? This action
            is permanent, and all data associated with this property will be
            lost and cannot be recovered.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PropertyDeleteForm property={property!} />
        </CardContent>
      </Card>
    </>
  );
}
