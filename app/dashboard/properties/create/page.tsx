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

import { PropertyCreateForm } from './form';

export default async function CreatePropertyPage() {
  const clients = await prisma.client.findMany();

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Add Property</PageHeaderHeading>
        <PageHeaderDescription>
          Please fill out the form below to add a new property to the database
          with accurate information for proper management.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild variant='outline' size='sm'>
            <Link href='/dashboard/properties'>
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
          <PropertyCreateForm clients={clients} />
        </CardContent>
      </Card>
    </>
  );
}
