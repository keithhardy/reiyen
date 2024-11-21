'use client';

import { PanelLeftOpen } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function MobileSiteMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className='inline-flex lg:hidden' asChild>
        <Button variant={'ghost'} className='-ml-2 mr-2 h-8 px-2'>
          <PanelLeftOpen className='h-5 w-5' />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <ScrollArea className='my-4 h-[calc(100vh-6rem)] pb-10 pl-6'>
          <div className='flex flex-col space-y-2'>
            <div className='flex flex-col space-y-3 pt-6'>
              <h4 className='font-medium'>Dashboard</h4>
              <Link
                href='/users'
                className='text-muted-foreground'
                onClick={() => {
                  setOpen(false);
                }}
              >
                Users
              </Link>
              <Link
                href='/clients'
                className='text-muted-foreground'
                onClick={() => {
                  setOpen(false);
                }}
              >
                Clients
              </Link>
              <Link
                href='/properties'
                className='text-muted-foreground'
                onClick={() => {
                  setOpen(false);
                }}
              >
                Properties
              </Link>
              <Link
                href='/certificates'
                className='text-muted-foreground'
                onClick={() => {
                  setOpen(false);
                }}
              >
                Certificates
              </Link>
              <Link
                href='/settings'
                className='text-muted-foreground'
                onClick={() => {
                  setOpen(false);
                }}
              >
                Settings
              </Link>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
