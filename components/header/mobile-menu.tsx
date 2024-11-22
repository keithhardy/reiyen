'use client';

import { PanelLeftOpen } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { menuLinks } from '@/lib/config';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="inline-flex lg:hidden" asChild>
        <Button variant="ghost" className="-ml-2 mr-2 h-8 px-2">
          <PanelLeftOpen className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <VisuallyHidden>
          <SheetTitle>Mobile Menu</SheetTitle>
        </VisuallyHidden>
        <ScrollArea className="my-4 h-[calc(100vh-6rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-3 pt-6">
              <h4 className="font-medium">Reiyen</h4>
              {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
