import { Metadata } from 'next';

import { UserCreateForm } from '@/app/users/create/form';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderGroup,
  PageHeaderHeading,
} from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Create – Users – Reiyen',
};

export default function UserCreatePage() {
  return (
    <>
      <PageHeader>
        <PageHeaderGroup>
          <PageHeaderHeading>Create User</PageHeaderHeading>
          <PageHeaderDescription>
            Fill out the form below to create a new user account. Ensure the information is
            accurate, and remember to assign roles on the user update page.
          </PageHeaderDescription>
        </PageHeaderGroup>
      </PageHeader>

      <Card className='grid grid-cols-2'>
        <CardHeader className='col-span-2 lg:col-span-1'>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>Please complete all fields with accurate information.</CardDescription>
        </CardHeader>
        <CardContent className='col-span-2 p-6 lg:col-span-1'>
          <UserCreateForm />
        </CardContent>
      </Card>
    </>
  );
}
