import { Metadata } from 'next';

import { UserDeleteForm } from '@/app/users/[id]/delete/form';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderGroup,
  PageHeaderHeading,
} from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { auth0Management } from '@/lib/auth0-management';

export const metadata: Metadata = {
  title: 'Delete – Users – Reiyen',
};

export default async function UserDeletePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const { data: user } = await auth0Management.users.get({
    id: 'auth0|' + params.id,
  });

  return (
    <>
      <PageHeader>
        <PageHeaderGroup>
          <PageHeaderHeading>Delete</PageHeaderHeading>
          <PageHeaderDescription>
            Permanently delete a user account. Review the user&apos;s details carefully before
            proceeding with this irreversible action.
          </PageHeaderDescription>
        </PageHeaderGroup>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Delete User</CardTitle>
          <CardDescription>
            Are you sure you want to delete <span className='text-primary'>{user.name}</span>? This
            action is permanent and the user will not be recoverable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserDeleteForm user={user} />
        </CardContent>
      </Card>
    </>
  );
}
