import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PropertyUpdateForm } from '@/app/(dashboard)/properties/[id]/update/form';
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
  title: 'Update – Properties – Reiyen',
};

export async function generateStaticParams() {
  const properties = await prisma.property.findMany({
    select: { id: true },
  });

  return properties.map((property) => ({
    id: property.id,
  }));
}

export default async function PropertyUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const property = await prisma.property.findUnique({
    where: {
      id: (await params).id,
    },
    include: {
      client: true,
      address: true,
    },
  });

  if (!property) {
    notFound();
  }

  const clients = await prisma.client.findMany();

  return (
    <>
      <PageHeader>
        <PageHeaderGroup>
          <PageHeaderHeading>Update</PageHeaderHeading>
          <PageHeaderDescription>
            Update the property&apos;s profile information, account details, and
            associated data. Make adjustments to ensure the property&apos;s
            information is accurate and up to date.
          </PageHeaderDescription>
        </PageHeaderGroup>
      </PageHeader>

      <Card className="grid grid-cols-2">
        <CardHeader className="col-span-2 lg:col-span-1">
          <CardTitle>Property Details</CardTitle>
          <CardDescription>
            Ensure each field is completed accurately.
          </CardDescription>
        </CardHeader>
        <CardContent className="col-span-2 p-6 lg:col-span-1">
          <PropertyUpdateForm property={property} clients={clients} />
        </CardContent>
      </Card>
    </>
  );
}
