'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState, useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { links } from '@/config/links';

export default function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (
        ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleShortcut);
    return () => document.removeEventListener('keydown', handleShortcut);
  }, []);

  const runCommand = useCallback((action: () => void) => {
    setOpen(false);
    action();
  }, []);

  return (
    <>
      <Button variant="ghost" className="h-8 px-2" onClick={() => setOpen(true)}>
        <Search className="h-5 w-5" /> Search
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Dashboard">
            {links.map(({ href, title }) => (
              <CommandItem key={href} onSelect={() => runCommand(() => router.push(href))}>
                {title}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Theme">
            {['light', 'dark', 'system'].map((theme) => (
              <CommandItem key={theme} onSelect={() => runCommand(() => setTheme(theme))}>
                {theme}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
