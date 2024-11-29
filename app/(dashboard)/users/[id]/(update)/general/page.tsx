import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { UserGeneralForm } from '@/app/(dashboard)/users/[id]/(update)/general/form';
import { prisma } from '@/lib/prisma';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'General – Users – Reiyen',
};

export async function generateStaticParams() {
  const users = await prisma.user.findMany({
    select: { id: true },
  });

  return users.map((user) => ({ id: user.id }));
}

export default async function UserGeneralPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await prisma.user.findFirst({
    where: {
      id: (await params).id,
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <Card className="grid grid-cols-2">
      <CardHeader className="col-span-2 lg:col-span-1">
        <CardTitle>General</CardTitle>
        <CardDescription>
          Update your general settings, including profile picture, name, and
          email, to keep your account information current.
        </CardDescription>
      </CardHeader>
      <CardContent className="col-span-2 p-6 lg:col-span-1">
        <UserGeneralForm user={user} />
      </CardContent>
    </Card>
  );
}
