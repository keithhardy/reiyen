'use client';

import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuGroup, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useTheme } from 'next-themes';

export default function UserMenu() {
  const { user, isLoading } = useUser();
  const { setTheme } = useTheme();

  if (isLoading) return <Skeleton className='ml-2 h-8 w-8 rounded-full' />;

  return (
    user && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon' className='ml-2 h-8 w-8 overflow-hidden rounded-full'>
            <Image src={user.picture ?? '/placeholder-user.webp'} alt={user.name ?? 'User avatar'} width={50} height={50} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>{user.nickname || user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/users/${encodeURIComponent(user.sub as string)}/update`}>Account</Link>
          </DropdownMenuItem>
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href='/api/auth/logout'>Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
