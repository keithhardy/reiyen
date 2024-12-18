import { Metadata } from 'next';

import { CertificateDeleteForm } from '@/app/(dashboard)/certificates/[id]/delete/form';
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
  title: 'Delete – Certificates – Reiyen',
};

export default async function CertificateDeletePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const certificate = await prisma.certificate.findUnique({
    where: {
      id: (await params).id,
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

  return (
    <>
      <PageHeader>
        <PageHeaderGroup>
          <PageHeaderHeading>Delete</PageHeaderHeading>
          <PageHeaderDescription>
            Are you sure you want to delete this certificate? This action is
            permanent.
          </PageHeaderDescription>
        </PageHeaderGroup>
      </PageHeader>

      <Card>
        <CardHeader className="col-span-2 lg:col-span-1">
          <CardTitle>Delete Certificate</CardTitle>
          <CardDescription>
            Are you sure you want to delete this certificate? This action is
            permanent, and all data associated with this certificate will be
            lost and cannot be recovered.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CertificateDeleteForm certificate={certificate!} />
        </CardContent>
      </Card>
    </>
  );
}
