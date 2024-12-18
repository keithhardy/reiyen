'use client';

import Link from 'next/link';

import { deleteQualification } from '@/app/(dashboard)/users/[id]/(update)/qualifications/action';
import { useToast } from '@/hooks/use-toast';
import { Qualification } from '@prisma/client';
import { ImageDown, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export function DataList({
  qualifications,
}: {
  qualifications: Qualification[];
}) {
  const { toast } = useToast();

  return (
    <ScrollArea className="h-[310px]">
      <div className="space-y-4 pr-4">
        {qualifications.length > 0 ? (
          qualifications.map((qualification, index) => (
            <div
              key={qualification.id}
              className={`grid grid-cols-5 items-center pb-4 ${index !== qualifications.length - 1 ? 'border-b border-dashed' : ''}`}
            >
              <div className="col-span-4 space-y-1">
                <p className="text-sm font-medium">
                  {qualification.qualification}
                </p>
                <p className="text-sm text-muted-foreground">
                  {qualification.awardingBody} -{' '}
                  {qualification.qualificationNumber} -{' '}
                  {qualification.awardDate}
                </p>
              </div>
              <div className="col-span-1">
                <p className="flex space-x-2 text-right text-sm font-medium">
                  <Button variant="outline" size="icon" asChild>
                    <Link href={qualification.certificateUrl} download>
                      <ImageDown />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={async () => {
                      try {
                        await deleteQualification(qualification);

                        toast({
                          title: 'Qualification Deleted',
                          description:
                            'The qualification has been successfully deleted.',
                        });
                      } catch {
                        toast({
                          title: 'Deletion Failed',
                          description:
                            'An error occurred while deleting the qualification. Please try again later.',
                          variant: 'destructive',
                        });
                      }
                    }}
                  >
                    <Trash2 className="text-red-500" />
                  </Button>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="py-4 text-center text-sm text-muted-foreground">
            No qualifications added yet.
          </p>
        )}
      </div>
    </ScrollArea>
  );
}
