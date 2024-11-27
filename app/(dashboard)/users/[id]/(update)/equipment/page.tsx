import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Metadata } from 'next';

import { DataList } from '@/app/(dashboard)/users/[id]/(update)/equipment/components/data-list';
import { UserEquipmentForm } from '@/app/(dashboard)/users/[id]/(update)/equipment/form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Equipment – Users – Reiyen',
};

export default async function UserEquipmentPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const equipment = await prisma.equipment.findMany({
    where: {
      userId: params.id,
    },
  });

  return (
    <Card className='grid grid-cols-2'>
      <CardHeader className='col-span-2 lg:col-span-1'>
        <CardTitle>Equipment</CardTitle>
        <CardDescription>
          This equipment is used by the user for work purposes. The information provided will be
          displayed on test certificates and other relevant documents.
        </CardDescription>
      </CardHeader>
      <CardContent className='col-span-2 p-6 lg:col-span-1'>
        <DataList equipment={equipment} />
      </CardContent>
      <CardFooter className='col-span-2'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Add Equipment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <VisuallyHidden>
              <DialogTitle />
            </VisuallyHidden>
            <Card className='border-none shadow-none'>
              <CardHeader>
                <CardTitle>Add Equipment</CardTitle>
                <CardDescription>
                  This equipment is used by the user for work purposes. The information provided
                  will be displayed on test certificates and other relevant documents.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserEquipmentForm user={{ user_id: params.id }} />
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
