'use client';

import { Equipment } from '@prisma/client';
import { ImageDown, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { deleteEquipment } from '@/app/(dashboard)/users/[id]/(update)/equipment/action';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

export function DataList({ equipment }: { equipment: Equipment[] }) {
  const { toast } = useToast();

  return (
    <ScrollArea className='h-[310px]'>
      <div className='space-y-4 pr-4'>
        {equipment.length > 0 ? (
          equipment.map((equipmentItem, index) => (
            <div key={equipmentItem.id} className={`grid grid-cols-5 items-center pb-4 ${index !== equipment.length - 1 ? 'border-b border-dashed' : ''}`}>
              <div className='col-span-4 space-y-1'>
                <p className='text-sm font-medium'>{equipmentItem.type}</p>
                <p className='text-sm text-muted-foreground'>
                  {equipmentItem.make}, {equipmentItem.model} - {equipmentItem.serialNumber} - {equipmentItem.testDate}
                </p>
              </div>
              <div className='col-span-1'>
                <p className='flex space-x-2 text-right text-sm font-medium'>
                  <Button variant='outline' size='icon' asChild>
                    <Link href={equipmentItem.certificateUrl} download>
                      <ImageDown />
                    </Link>
                  </Button>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={async () => {
                      try {
                        await deleteEquipment(equipmentItem);

                        toast({
                          title: 'Equipment Deleted',
                          description: 'The equipment has been successfully deleted.',
                        });
                      } catch {
                        toast({
                          title: 'Deletion Failed',
                          description: 'An error occurred while deleting the equipment. Please try again later.',
                          variant: 'destructive',
                        });
                      }
                    }}
                  >
                    <Trash2 className='text-red-500' />
                  </Button>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className='py-4 text-center text-sm text-muted-foreground'>No equipment added yet.</p>
        )}
      </div>
    </ScrollArea>
  );
}
