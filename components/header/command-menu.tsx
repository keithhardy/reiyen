'use client';

import { useCallback, useEffect, useState } from 'react';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

import { menuLinks } from '@/lib/config';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { DialogTitle } from '@/components/ui/dialog';

export default function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (
        ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(
          (e.target as HTMLElement).tagName
        )
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
      <Button
        variant="ghost"
        className="h-8 px-2"
        onClick={() => setOpen(true)}
      >
        <Search className="min-h-4 min-w-4" /> Search
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <VisuallyHidden>
          <DialogTitle>Command Menu</DialogTitle>
        </VisuallyHidden>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Reiyen">
            {menuLinks.map(({ href, label }) => (
              <CommandItem
                key={href}
                onSelect={() => runCommand(() => router.push(href))}
              >
                {label}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Theme">
            {['light', 'dark', 'system'].map((theme) => (
              <CommandItem
                key={theme}
                onSelect={() => runCommand(() => setTheme(theme))}
              >
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
