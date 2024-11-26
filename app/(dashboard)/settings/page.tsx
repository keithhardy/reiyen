import { Metadata } from 'next';

import { SettingsUpdateForm } from '@/app/(dashboard)/settings/form';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderGroup,
  PageHeaderHeading,
} from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Settings – Reiyen',
};

export default async function SettingsPage() {
  const settings = await prisma.settings.findFirst({
    include: {
      address: true,
    },
  });

  return (
    <>
      <PageHeader>
        <PageHeaderGroup>
          <PageHeaderHeading>Settings</PageHeaderHeading>
          <PageHeaderDescription>
            View and manage all your settings in one place. Download, share, or verify your
            properties with ease.
          </PageHeaderDescription>
        </PageHeaderGroup>
      </PageHeader>

      <Card className='grid grid-cols-2'>
        <CardHeader className='col-span-2 lg:col-span-1'>
          <CardTitle>Details</CardTitle>
          <CardDescription>Ensure each field is completed accurately.</CardDescription>
        </CardHeader>
        <CardContent className='col-span-2 p-6 lg:col-span-1'>
          <SettingsUpdateForm settings={settings!} />
        </CardContent>
      </Card>
    </>
  );
}
