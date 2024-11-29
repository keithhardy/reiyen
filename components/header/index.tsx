'use client';

import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import { menuLinks } from '@/lib/config';
import { PathMatch, cn } from '@/lib/utils';

import CommandMenu from '@/components/header/command-menu';
import UserMenu from '@/components/header/user-menu';
import Logo from '@/components/logo';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b bg-transparent backdrop-blur">
      <div
        className={`fixed top-0 w-full ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}
        style={{ zIndex: 30 }}
      >
        <div className="flex justify-between px-6 pt-4">
          <nav className="flex items-center">
            <Logo className="mr-2 min-h-5 min-w-5" />
          </nav>
          <div className="flex items-center">
            <CommandMenu />
            <UserMenu />
          </div>
        </div>
      </div>

      <div className={`px-6 py-4 ${isScrolled ? 'mt-0' : 'mt-[48px]'}`}>
        <div
          className="relative flex items-center overflow-x-auto whitespace-nowrap"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <Logo
            className={`mr-4 h-6 min-h-6 w-6 min-w-6 ${isScrolled ? 'block' : 'hidden'} `}
          />
          <ul
            className="flex flex-nowrap space-x-4"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {menuLinks.map((item) => (
              <li
                key={item.label}
                className={`shrink-0 ${PathMatch(item.href, pathname) ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <a
                  href={item.href}
                  className={cn('block text-sm hover:text-primary')}
                >
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
    </header>
  );
}
