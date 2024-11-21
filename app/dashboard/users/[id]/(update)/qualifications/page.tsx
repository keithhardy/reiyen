import { DataList } from '@/app/dashboard/users/[id]/(update)/qualifications/components/data-list';
import { UserQualificationsForm } from '@/app/dashboard/users/[id]/(update)/qualifications/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { prisma } from '@/lib/prisma';

export default async function UserQualificationsPage({ params }: { params: { id: string } }) {
  const qualifications = await prisma.qualification.findMany({
    where: {
      userId: decodeURIComponent(params.id),
    },
  });

  return (
    <Card className='grid grid-cols-2'>
      <CardHeader className='col-span-2 lg:col-span-1'>
        <CardTitle>Qualifications</CardTitle>
        <CardDescription>Set your qualifications for the application to ensure a personalized user experience.</CardDescription>
      </CardHeader>
      <CardContent className='col-span-2 p-6 lg:col-span-1'>
        <DataList qualifications={qualifications} />
      </CardContent>
      <CardFooter className='col-span-2'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' size='sm' className='ml-auto'>
              Add Qualification
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Card className='border-none shadow-none'>
              <CardHeader>
                <CardTitle>Add Qualification</CardTitle>
                <CardDescription>Set your qualifications for the application to ensure a personalized user experience.</CardDescription>
              </CardHeader>
              <CardContent>
                <UserQualificationsForm user={{ user_id: decodeURIComponent(params.id) }} />
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}