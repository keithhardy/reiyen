import { Metadata } from 'next';

import { PropertyDeleteForm } from '@/app/properties/[id]/delete/form';
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
  title: 'Delete – Properties – Reiyen',
};

export default async function PropertyDeletePage(props: {
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
        <PageHeaderGroup>
          <PageHeaderHeading>Delete</PageHeaderHeading>
          <PageHeaderDescription>
            Are you sure you want to delete this property? This action is
            permanent.
          </PageHeaderDescription>
        </PageHeaderGroup>
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
