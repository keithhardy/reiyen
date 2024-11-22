'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { userLinks } from '@/lib/config';

export function SidebarLinks({ userId }: { userId: string }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const links = userLinks(userId)

  const handleItemClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className='space-y-2'>
      <Button variant='outline' className='w-full justify-start lg:hidden' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? 'Hide Menu' : 'Show Menu'}
      </Button>

      <div className={`${isSidebarOpen ? 'block' : 'hidden'} space-y-2 lg:block`}>
        {links.map(({ href, label }) => (
          <div key={label} className='w-full'>
            <Button asChild variant='ghost' className={`w-full justify-start ${pathname === href ? 'text-primary' : 'text-muted-foreground'}`} onClick={handleItemClick}>
              <Link href={href!}>{label}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
