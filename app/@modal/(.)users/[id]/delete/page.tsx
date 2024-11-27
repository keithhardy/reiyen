import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { UserDeleteForm } from '@/app/(dashboard)/users/[id]/delete/form';
import { Modal } from '@/app/@modal/components/modal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Delete – Users – Reiyen',
};

export default async function UserDeletePage({ params }: { params: Promise<{ id: string }> }) {
  const user = await prisma.user.findFirst({
    where: {
      id: (await params).id,
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <Modal>
      <Card className='border-none shadow-none'>
        <CardHeader className='col-span-2 lg:col-span-1'>
          <CardTitle>Delete User</CardTitle>
          <CardDescription>
            Are you sure you want to delete <span className='text-primary'>{user.name}</span>? This action is permanent and the user will not be recoverable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserDeleteForm user={user} />
        </CardContent>
      </Card>
    </Modal>
  );
}
