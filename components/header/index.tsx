import CommandMenu from '@/components/header/command-menu';
import DesktopMenu from '@/components/header/desktop-menu';
import MobileMenu from '@/components/header/mobile-menu';
import Logo from '@/components/logo';
import UserMenu from '@/components/header/user-menu';

export default async function Header() {
  return (
    <header className='sticky top-0 z-10 border-b bg-transparent py-2 backdrop-blur'>
      <div className='flex justify-between px-4'>
        <nav className='flex items-center'>
          <MobileMenu />
          <Logo className='mr-2 w-6' />
          <DesktopMenu />
        </nav>
        <div className='flex items-center'>
          <CommandMenu />
          <UserMenu/>
        </div>
      </div>
    </header>
  );
}
