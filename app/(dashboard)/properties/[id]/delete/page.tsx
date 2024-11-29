import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PropertyDeleteForm } from '@/app/(dashboard)/properties/[id]/delete/form';
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
  title: 'Delete – Properties – Reiyen',
};

export async function generateStaticParams() {
  const properties = await prisma.property.findMany({
    select: { id: true },
  });

  return properties.map((property) => ({
    id: property.id,
  }));
}

export default async function PropertyDeletePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const property = await prisma.property.findUnique({
    where: {
      id: (await params).id,
    },
  });

  if (!property) {
    notFound();
  }

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
        <CardHeader className="col-span-2 lg:col-span-1">
          <CardTitle>Delete Property</CardTitle>
          <CardDescription>
            Are you sure you want to delete{' '}
            <span className="text-primary">{property?.uprn}</span>? This action
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
