import { auth0 } from "@/lib/auth0";

import CommandMenu from '@/components/header/command-menu';
import DesktopMenu from '@/components/header/desktop-menu';
import MobileMenu from '@/components/header/mobile-menu';
import ReiyenLogo from '@/components/reiyen-logo';
import UserMenu from '@/components/header/user-menu';

export default async function Header() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <header className='sticky top-0 z-10 border-b bg-transparent py-2 backdrop-blur'>
      <div className='flex justify-between px-4'>
        <nav className='flex items-center'>
          <MobileMenu />
          <ReiyenLogo className='mr-2 w-6' />
          <DesktopMenu />
        </nav>
        <div className='flex items-center'>
          <CommandMenu />
          {user && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}