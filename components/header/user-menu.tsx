'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/header/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"

export interface User {
  sub: string;
  name?: string;
  nickname?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
  org_id?: string;
  [key: string]: any;
}

export default function UserMenu({
  user
}: {
  user: User
}) {
  return (
    user && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon' className='ml-2 h-8 w-8 overflow-hidden rounded-full'>
            <Avatar>
              <AvatarImage src={user.picture} alt="Profile picture" />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/users/${encodeURIComponent(user.sub)}/update`}>Account</Link>
          </DropdownMenuItem>
          <ThemeToggle />
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href='/api/auth/logout'>Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
