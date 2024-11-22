import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { DeleteUserForm } from '@/app/dashboard/users/[id]/delete/form';
import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { auth0Management } from '@/lib/auth0-management';

export default async function DeleteUserPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { data: user } = await auth0Management.users.get({
    id: decodeURIComponent(params.id),
  });

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Delete</PageHeaderHeading>
        <PageHeaderDescription>Permanently delete a user account. Review the user&apos;s details carefully before proceeding with this irreversible action.</PageHeaderDescription>
        <PageActions>
          <Button asChild variant='outline'>
            <Link href='/dashboard/users'>
              <ArrowLeft />
              Back to users
            </Link>
          </Button>
        </PageActions>
      </PageHeader>

      <Card className='grid grid-cols-2'>
        <CardHeader className='col-span-2 lg:col-span-1'>
          <CardTitle>Delete User</CardTitle>
          <CardDescription>
            Are you sure you want to delete <span className='text-primary'>{user.name}</span>? This action is permanent and the user will not be recoverable.
          </CardDescription>
        </CardHeader>
        <CardContent className='col-span-2 p-6 lg:col-span-1'>
          <DeleteUserForm user={user} />
        </CardContent>
      </Card>
    </>
  );
}
