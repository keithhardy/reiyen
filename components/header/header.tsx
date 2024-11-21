import { auth0 } from "@/lib/auth0"

import CommandMenu from '@/components/header/command-menu';
import DesktopSiteMenu from '@/components/header/desktop-site-menu';
import MobileSiteMenu from '@/components/header/mobile-site-menu';
import ReiyenLogo from '@/components/reiyen-logo';
import UserMenu from '@/components/header/user-menu';

export default async function Header() {
  const session = await auth0.getSession()

  if (!session) {
    return <div>Not authenticated</div>
  }

  const user = session.user

  if (!user) {
    return <div>Not authenticated</div>
  }

  return (
    <header className='sticky top-0 z-10 border-b bg-transparent py-2 backdrop-blur'>
      <div className='flex justify-between px-4'>
        <nav className='flex items-center'>
          <MobileSiteMenu />
          <ReiyenLogo className='mr-2 w-6' />
          <DesktopSiteMenu />
        </nav>
        <div className='flex items-center'>
          <CommandMenu />
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
}
