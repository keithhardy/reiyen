'use client';

import { usePathname } from 'next/navigation';

import { userLinks } from '@/lib/config';
import { cn } from '@/lib/utils';

export function SidebarLinks({ userId }: { userId: string }) {
  const pathname = usePathname();

  const links = userLinks(userId);

  return (
    <div className='pb-6'>
      <div
        className='relative flex items-center overflow-x-auto whitespace-nowrap'
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <ul className='flex flex-nowrap space-x-4' style={{ WebkitOverflowScrolling: 'touch' }}>
          {links.map((item) => (
            <li
              key={item.label}
              className={`shrink-0 ${pathname === item.href ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              <a href={item.href} className={cn('block text-sm font-medium hover:text-foreground')}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
}
