import { Metadata } from 'next';

import { UserGeneralForm } from '@/app/users/[id]/(update)/general/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth0Management } from '@/lib/auth0-management';

export const metadata: Metadata = {
  title: 'General – Users – Reiyen',
};

export default async function UserGeneralPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const { data: user } = await auth0Management.users.get({
    id: 'auth0|' + params.id,
  });

  return (
    <Card className='grid grid-cols-2'>
      <CardHeader className='col-span-2 lg:col-span-1'>
        <CardTitle>General</CardTitle>
        <CardDescription>
          Update your general settings, including profile picture, name, and
          email, to keep your account information current.
        </CardDescription>
      </CardHeader>
      <CardContent className='col-span-2 p-6 lg:col-span-1'>
        <UserGeneralForm user={user} />
      </CardContent>
    </Card>
  );
}
