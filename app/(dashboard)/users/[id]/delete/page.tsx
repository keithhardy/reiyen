import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { UserDeleteForm } from '@/app/(dashboard)/users/[id]/delete/form';
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
  title: 'Delete – Users – Reiyen',
};

export async function generateStaticParams() {
  const users = await prisma.user.findMany({
    select: { id: true },
  });

  return users.map((user) => ({ id: user.id }));
}

export default async function UserDeletePage({
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
    <>
      <PageHeader>
        <PageHeaderGroup>
          <PageHeaderHeading>Delete</PageHeaderHeading>
          <PageHeaderDescription>
            Permanently delete a user account. Review the user&apos;s details
            carefully before proceeding with this irreversible action.
          </PageHeaderDescription>
        </PageHeaderGroup>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Delete User</CardTitle>
          <CardDescription>
            Are you sure you want to delete{' '}
            <span className="text-primary">{user.name}</span>? This action is
            permanent and the user will not be recoverable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserDeleteForm user={user} />
        </CardContent>
      </Card>
    </>
  );
}
