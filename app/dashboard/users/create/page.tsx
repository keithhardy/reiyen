import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { CreateUserForm } from '@/app/dashboard/users/create/form';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CreateUserPage() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Create User</PageHeaderHeading>
        <PageHeaderDescription>
          Fill out the form below to create a new user account. Ensure the
          information is accurate, and remember to assign roles on the user
          update page.
        </PageHeaderDescription>
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
          <CardTitle>Account Details</CardTitle>
          <CardDescription>
            Please complete all fields with accurate information.
          </CardDescription>
        </CardHeader>
        <CardContent className='col-span-2 p-6 lg:col-span-1'>
          <CreateUserForm />
        </CardContent>
      </Card>
    </>
  );
}
