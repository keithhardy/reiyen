import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { CertificateCreateForm } from '@/app/dashboard/certificates/create/form';
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

export default async function CertificateCreatePage() {
  const clients = await prisma.client.findMany({
    include: {
      Property: {
        include: {
          address: true,
        },
      },
    },
  });

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Add Certificate</PageHeaderHeading>
        <PageHeaderDescription>
          Please fill out the form below to add a new certificate to the
          database with accurate information for proper management.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild variant='outline' size='sm'>
            <Link href='/dashboard/certificates'>
              <ArrowLeft />
              Back to certificates
            </Link>
          </Button>
        </PageActions>
      </PageHeader>

      <Card className='grid grid-cols-2'>
        <CardHeader className='col-span-2 lg:col-span-1'>
          <CardTitle>Certificate Details</CardTitle>
          <CardDescription>
            Ensure each field is completed accurately.
          </CardDescription>
        </CardHeader>
        <CardContent className='col-span-2 p-6 lg:col-span-1'>
          <CertificateCreateForm clients={clients} />
        </CardContent>
      </Card>
    </>
  );
}
