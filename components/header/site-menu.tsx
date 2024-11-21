'use client';

import * as React from 'react';

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const dashboardItems = [
  {
    title: 'Users',
    href: '/users',
    description: 'Administer user accounts and permissions within the system.',
  },
  {
    title: 'Clients',
    href: '/clients',
    description: 'Manage client records and associated data within the system.',
  },
  {
    title: 'Properties',
    href: '/properties',
    description: 'Manage client records and associated data within the system.',
  },
  {
    title: 'Certificates',
    href: '/certificates',
    description: 'Manage client records and associated data within the system.',
  },
  {
    title: 'Settings',
    href: '/settings',
    description: 'Manage system wide settings.',
  },
];

export default function SiteMenu() {
  return (
    <NavigationMenu className='hidden lg:block'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='h-8 bg-transparent px-2 hover:bg-transparent data-[state=open]:bg-transparent'>Dashboard</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
              {dashboardItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a ref={ref} className={cn('block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground', className)} {...props}>
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
