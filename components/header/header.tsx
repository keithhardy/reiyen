import ReiyenLogo from '@/components/reiyen-logo';

import CommandMenu from './command-menu';
import FullScreenButton from './full-screen-button';
import MobileSiteMenu from './mobile-site-menu';
import SiteMenu from './site-menu';
import UserMenu from './user-menu';

export default function Header() {
  return (
    <header className='sticky top-0 z-10 border-b bg-transparent py-2 backdrop-blur'>
      <div className='flex justify-between px-4'>
        <nav className='flex items-center'>
          <MobileSiteMenu />
          <ReiyenLogo className='mr-2 w-6' />
          <SiteMenu />
        </nav>
        <div className='flex items-center'>
          <CommandMenu />
          <FullScreenButton />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
