import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import { CertificateUpdateForm } from '@/app/dashboard/certificates/[id]/update/form';
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

export const metadata: Metadata = {
  title: 'Update – Certificates – Reiyen',
};

export default async function CertificateUpdatePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const certificate = await prisma.certificate.findUnique({
    where: {
      id: params.id,
    },
    include: {
      property: {
        include: {
          address: true,
          client: true,
        },
      },
    },
  });

  const clients = await prisma.client.findMany({
    include: {
      properties: {
        include: {
          address: true,
        },
      },
    },
  });

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Update</PageHeaderHeading>
        <PageHeaderDescription>
          Update the certificate&apos;s profile information, account details,
          and associated data. Make adjustments to ensure the certificate&apos;s
          information is accurate and up to date.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild variant='outline' size='sm'>
            <Link href={'/dashboard/certificates'}>
              <ArrowLeft />
              Back to certificates
            </Link>
          </Button>
        </PageActions>
      </PageHeader>

      <Card className='grid grid-cols-2'>
        <CardHeader className='col-span-2 lg:col-span-1'>
          <CardTitle>Credentials</CardTitle>
          <CardDescription>
            Ensure each field is completed accurately.
          </CardDescription>
        </CardHeader>
        <CardContent className='col-span-2 p-6 lg:col-span-1'>
          <CertificateUpdateForm
            certificate={certificate!}
            clients={clients!}
          />
        </CardContent>
      </Card>
    </>
  );
}
