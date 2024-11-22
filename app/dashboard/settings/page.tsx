import { SettingsUpdateForm } from '@/app/dashboard/settings/form';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

export default async function UsersPage() {
  const settings = await prisma.settings.findFirst({
    include: {
      address: true,
    },
  });

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Settings</PageHeaderHeading>
        <PageHeaderDescription>
          View and manage all your settings in one place. Download, share, or
          verify your properties with ease.
        </PageHeaderDescription>
      </PageHeader>

      <Card className='grid grid-cols-2'>
        <CardHeader className='col-span-2 lg:col-span-1'>
          <CardTitle>Details</CardTitle>
          <CardDescription>
            Ensure each field is completed accurately.
          </CardDescription>
        </CardHeader>
        <CardContent className='col-span-2 p-6 lg:col-span-1'>
          <SettingsUpdateForm settings={settings!} />
        </CardContent>
      </Card>
    </>
  );
}
