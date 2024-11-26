import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Metadata } from 'next';

import { DataList } from '@/app/users/[id]/(update)/permissions/components/data-list';
import { UserPermissionsForm } from '@/app/users/[id]/(update)/permissions/form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Permissions – Users – Reiyen',
};

export default async function UserPermissionsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const permissions = await prisma.permission.findMany({
    where: { userId: 'auth0|' + params.id },
  });

  const clients = await prisma.client.findMany();

  return (
    <Card className='grid grid-cols-2'>
      <CardHeader className='col-span-2 lg:col-span-1'>
        <CardTitle>Permissions</CardTitle>
        <CardDescription>
          Manage user permissions globally and for specific clients.
        </CardDescription>
      </CardHeader>
      <CardContent className='col-span-2 p-6 lg:col-span-1'>
        <DataList permissions={permissions} clients={clients} />
      </CardContent>
      <CardFooter className='col-span-2'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Add Permissions
            </Button>
          </DialogTrigger>
          <DialogContent>
            <VisuallyHidden>
              <DialogTitle />
            </VisuallyHidden>
            <Card className='border-none shadow-none'>
              <CardHeader>
                <CardTitle>Add Permissions</CardTitle>
                <CardDescription>
                  Assign specific permissions to the user for global or
                  client-specific access.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserPermissionsForm
                  permissions={permissions}
                  clients={clients}
                  user={{ user_id: 'auth0|' + params.id }}
                />
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
