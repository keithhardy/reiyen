import { Metadata } from 'next';

import { Modal } from '@/app/@modal/components/modal';
import { UserDeleteForm } from '@/app/users/[id]/delete/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth0Management } from '@/lib/auth0-management';

export const metadata: Metadata = {
  title: 'Delete – Users – Reiyen',
};

export default async function UserDeletePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const { data: user } = await auth0Management.users.get({
    id: decodeURIComponent(params.id),
  });

  return (
    <Modal>
      <Card className='border-none shadow-none'>
        <CardHeader className='col-span-2 lg:col-span-1'>
          <CardTitle>Delete User</CardTitle>
          <CardDescription>
            Are you sure you want to delete{' '}
            <span className='text-primary'>{user.name}</span>? This action is
            permanent and the user will not be recoverable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserDeleteForm user={user} />
        </CardContent>
      </Card>
    </Modal>
  );
}
