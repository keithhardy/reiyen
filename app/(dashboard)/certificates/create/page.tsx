import { Metadata } from 'next';

import { CertificateCreateForm } from '@/app/(dashboard)/certificates/create/form';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderGroup,
  PageHeaderHeading,
} from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Create – Certificates – Reiyen',
};

export default async function CertificateCreatePage() {
  return (
    <>
      <PageHeader>
        <PageHeaderGroup>
          <PageHeaderHeading>Add Certificate</PageHeaderHeading>
          <PageHeaderDescription>
            Please fill out the form below to add a new certificate to the database with accurate
            information for proper management.
          </PageHeaderDescription>
        </PageHeaderGroup>
      </PageHeader>

      <Card className='grid grid-cols-2'>
        <CardHeader className='col-span-2 lg:col-span-1'>
          <CardTitle>Certificate Details</CardTitle>
          <CardDescription>Ensure each field is completed accurately.</CardDescription>
        </CardHeader>
        <CardContent className='col-span-2 p-6 lg:col-span-1'>
          <CertificateCreateForm />
        </CardContent>
      </Card>
    </>
  );
}
