import { Metadata } from 'next';

import { PropertyCreateForm } from '@/app/(dashboard)/properties/create/form';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderGroup,
  PageHeaderHeading,
} from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Create – Properties – Reiyen',
};

export default async function PropertyCreatePage() {
  const clients = await prisma.client.findMany();

  return (
    <>
      <PageHeader>
        <PageHeaderGroup>
          <PageHeaderHeading>Add Property</PageHeaderHeading>
          <PageHeaderDescription>
            Please fill out the form below to add a new property to the database with accurate
            information for proper management.
          </PageHeaderDescription>
        </PageHeaderGroup>
      </PageHeader>

      <Card className='grid grid-cols-2'>
        <CardHeader className='col-span-2 lg:col-span-1'>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>Ensure each field is completed accurately.</CardDescription>
        </CardHeader>
        <CardContent className='col-span-2 p-6 lg:col-span-1'>
          <PropertyCreateForm clients={clients} />
        </CardContent>
      </Card>
    </>
  );
}
