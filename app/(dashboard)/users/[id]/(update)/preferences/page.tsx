import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { UserPreferencesForm } from '@/app/(dashboard)/users/[id]/(update)/preferences/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Preferences – Users – Reiyen',
};

export default async function UserPreferencesPage({ params }: { params: Promise<{ id: string }> }) {
  const preferences = await prisma.preferences.findUnique({
    where: {
      userId: (await params).id,
    },
  });

  if (!preferences) {
    notFound();
  }

  return (
    <Card className='grid grid-cols-2'>
      <CardHeader className='col-span-2 lg:col-span-1'>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Set your preferences for the application to ensure a personalized user experience.</CardDescription>
      </CardHeader>
      <CardContent className='col-span-2 p-6 lg:col-span-1'>
        <UserPreferencesForm preferences={preferences} />
      </CardContent>
    </Card>
  );
}
