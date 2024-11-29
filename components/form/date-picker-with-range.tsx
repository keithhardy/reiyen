'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerWithRangeProps {
  className?: string;
  onSelect?: (range: DateRange | undefined) => void;
}

export const DatePickerWithRange = React.forwardRef(({ className, onSelect }: DatePickerWithRangeProps, ref) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const handleDateSelect = (range: DateRange | undefined) => {
    setDate(range);
    if (onSelect) {
      onSelect(range);
    }
  };

  React.useImperativeHandle(ref, () => ({
    reset: () => {
      setDate(undefined);
      if (onSelect) {
        onSelect(undefined);
      }
    },
  }));

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button id='date' variant='outline' className={cn('h-8 items-center justify-start border-dashed text-left', !date && 'text-muted-foreground')}>
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar initialFocus mode='range' defaultMonth={date?.from} selected={date} onSelect={handleDateSelect} numberOfMonths={2} />
        </PopoverContent>
      </Popover>
    </div>
  );
});
DatePickerWithRange.displayName = 'DatePickerWithRange';
