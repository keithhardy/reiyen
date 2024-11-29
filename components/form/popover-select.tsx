import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface PopoverSelectProps {
  value?: string;
  onChange: (value: string) => void;
  options: { id: string; name: string }[];
  label?: string; // Optional label for options (e.g., "client")
}

export function PopoverSelect({
  value,
  onChange,
  options,
  label = 'option',
}: PopoverSelectProps) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [popoverWidth, setPopoverWidth] = useState<string | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (triggerRef.current) {
      setPopoverWidth(`${triggerRef.current.offsetWidth}px`);
    }
  }, [triggerRef.current?.offsetWidth]);

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={(open) => setIsPopoverOpen(open)}
    >
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          className={cn(
            'w-full justify-between',
            !value && 'text-muted-foreground'
          )}
        >
          {value
            ? options.find((option) => option.id === value)?.name
            : `Select ${label}`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        style={{ width: popoverWidth || 'auto' }}
        className="p-0"
      >
        <Command>
          <CommandInput placeholder={`Search ${label}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No {label}s found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.name}
                  onSelect={() => {
                    onChange(option.id);
                    setIsPopoverOpen(false);
                  }}
                >
                  {option.name}
                  <Check
                    className={cn(
                      'ml-auto',
                      option.id === value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
