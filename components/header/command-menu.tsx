'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

export default function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if ((e.target instanceof HTMLElement && e.target.isContentEditable) || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button variant={'ghost'} className='h-8 px-2' onClick={() => setOpen(true)}>
        <Search className='h-5 w-5' /> Search
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Dashboard'>
            <CommandItem onSelect={() => runCommand(() => router.push('/users'))}>Users</CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/clients'))}>Clients</CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/properties'))}>Properties</CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/certificates'))}>Certificates</CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push('/settings'))}>Settings</CommandItem>
          </CommandGroup>
          <CommandGroup heading='Theme'>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>Light</CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>Dark</CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>System</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
