'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useUser } from "@auth0/nextjs-auth0"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { Skeleton } from '@/components/ui/skeleton';

export default function UserMenu() {
  const { user, isLoading } = useUser()

  if (isLoading) return <Skeleton className='ml-2 h-8 w-8 rounded-full' />;

  const { setTheme } = useTheme();

  return (
    user && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='ml-2 h-8 w-8 cursor-pointer'>
            <AvatarImage src={user.picture} alt="Profile picture" />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/users/${encodeURIComponent(user.sub)}/update`}>Profile</Link>
          </DropdownMenuItem>
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                      {['light', 'dark', 'system'].map((theme) => (
                        <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
                          {theme.charAt(0).toUpperCase() + theme.slice(1)}
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href='/auth/logout'>Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
