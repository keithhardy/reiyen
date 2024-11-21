import { DataList } from '@/app/dashboard/users/[id]/(update)/permissions/components/data-list';
import { UserPermissionsForm } from '@/app/dashboard/users/[id]/(update)/permissions/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { prisma } from '@/lib/prisma';

export default async function UserPermissionsPage({ params }: { params: { id: string } }) {
  const permissions = await prisma.permission.findMany({
    where: { userId: decodeURIComponent(params.id) },
  });

  const clients = await prisma.client.findMany();

  return (
    <Card className='grid grid-cols-2'>
      <CardHeader className='col-span-2 lg:col-span-1'>
        <CardTitle>Permissions</CardTitle>
        <CardDescription>Manage user permissions globally and for specific clients.</CardDescription>
      </CardHeader>
      <CardContent className='col-span-2 p-6 lg:col-span-1'>
        <DataList permissions={permissions} clients={clients} />
      </CardContent>
      <CardFooter className='col-span-2'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' size='sm' className='ml-auto'>
              Add Permissions
            </Button>
          </DialogTrigger>
          <DialogContent>
            <UserPermissionsForm permissions={permissions} clients={clients} user={{ user_id: decodeURIComponent(params.id) }} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
