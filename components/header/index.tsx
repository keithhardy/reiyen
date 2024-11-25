import CommandMenu from '@/components/header/command-menu';
import DesktopMenu from '@/components/header/desktop-menu';
import MobileMenu from '@/components/header/mobile-menu';
import UserMenu from '@/components/header/user-menu';
import Logo from '@/components/logo';

export default async function Header() {
  return (
    <header className='sticky top-0 z-10 border-b bg-transparent px-2 py-4 backdrop-blur'>
      <div className='flex justify-between px-4'>
        <nav className='flex items-center'>
          <MobileMenu />
          <Logo className='mr-2 min-h-5 min-w-5' />
          <DesktopMenu />
        </nav>
        <div className='flex items-center'>
          <CommandMenu />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
