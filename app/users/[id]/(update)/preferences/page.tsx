import { Metadata } from 'next';

import { UserPreferencesForm } from '@/app/users/[id]/(update)/preferences/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Preferences – Users – Reiyen',
};

export default async function UserPreferencesPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const preferences = await prisma.preferences.findUnique({
    where: {
      userId: 'auth0|' + params.id,
    },
  });

  return (
    <Card className='grid grid-cols-2'>
      <CardHeader className='col-span-2 lg:col-span-1'>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>
          Set your preferences for the application to ensure a personalized user experience.
        </CardDescription>
      </CardHeader>
      <CardContent className='col-span-2 p-6 lg:col-span-1'>
        <UserPreferencesForm preferences={preferences!} user={{ user_id: 'auth0|' + params.id }} />
      </CardContent>
    </Card>
  );
}
