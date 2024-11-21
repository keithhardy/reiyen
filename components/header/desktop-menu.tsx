'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { menuLinks } from '@/lib/config';

export default function DesktopMenu() {
  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="h-8 bg-transparent px-2 hover:bg-transparent data-[state=open]:bg-transparent">
            Dashboard
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {menuLinks.map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink asChild>
                    <a
                      href={item.href}
                      className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors',
                        'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                      )}
                    >
                      <div className="text-sm font-medium leading-none">{item.title}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {item.description}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
