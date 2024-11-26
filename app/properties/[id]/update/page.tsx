import { Metadata } from 'next';

import { PropertyUpdateForm } from '@/app/properties/[id]/update/form';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderGroup,
  PageHeaderHeading,
} from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Update – Properties – Reiyen',
};

export async function generateStaticParams() {
  const properties = await prisma.property.findMany({
    select: { id: true },
  });

  return properties.map((property) => ({ id: property.id }));
}

export default async function PropertyUpdatePage(props: { params: Promise<{ id: string }> }) {
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
        <PageHeaderGroup>
          <PageHeaderHeading>Update</PageHeaderHeading>
          <PageHeaderDescription>
            Update the property&apos;s profile information, account details, and associated data.
            Make adjustments to ensure the property&apos;s information is accurate and up to date.
          </PageHeaderDescription>
        </PageHeaderGroup>
      </PageHeader>

      <Card className='grid grid-cols-2'>
        <CardHeader className='col-span-2 lg:col-span-1'>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>Ensure each field is completed accurately.</CardDescription>
        </CardHeader>
        <CardContent className='col-span-2 p-6 lg:col-span-1'>
          <PropertyUpdateForm property={property!} clients={clients!} />
        </CardContent>
      </Card>
    </>
  );
}
