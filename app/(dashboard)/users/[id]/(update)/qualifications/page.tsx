import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Metadata } from 'next';

import { DataList } from '@/app/(dashboard)/users/[id]/(update)/qualifications/components/data-list';
import { UserQualificationsForm } from '@/app/(dashboard)/users/[id]/(update)/qualifications/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Qualifications – Users – Reiyen',
};

export async function generateStaticParams() {
  const users = await prisma.user.findMany({
    select: { id: true },
  });

  return users.map((user) => ({ id: user.id }));
}

export default async function UserQualificationsPage({ params }: { params: Promise<{ id: string }> }) {
  const qualifications = await prisma.qualification.findMany({
    where: {
      userId: (await params).id,
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
            <Button variant='outline' className='ml-auto'>
              Add Qualification
            </Button>
          </DialogTrigger>
          <DialogContent>
            <VisuallyHidden>
              <DialogTitle />
            </VisuallyHidden>
            <Card className='border-none shadow-none'>
              <CardHeader>
                <CardTitle>Add Qualification</CardTitle>
                <CardDescription>Set your qualifications for the application to ensure a personalized user experience.</CardDescription>
              </CardHeader>
              <CardContent>
                <UserQualificationsForm userId={(await params).id} />
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
