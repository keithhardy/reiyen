"use client";

import { ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MultiSelect({
  options = [],
  selectedValues = [],
  onChange,
  placeholder = 'Select options',
  disabled = false,
}: MultiSelectProps) {
  const allSelected = options.length > 0 && selectedValues.length === options.length;
  const isIndeterminate =
    selectedValues.length > 0 && selectedValues.length < options.length;

  const displayText = (() => {
    if (selectedValues.length === 0) {
      return placeholder;
    } else if (allSelected) {
      return `All options selected`;
    } else if (selectedValues.length === 1) {
      const selectedOption = options.find((option) => option.value === selectedValues[0]);
      return selectedOption ? selectedOption.label : placeholder;
    } else {
      return `${selectedValues.length} options selected`;
    }
  })();

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allValues = options.map((option) => option.value);
      onChange(allValues);
    } else {
      onChange([]);
    }
  };

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled || options.length === 0}
          className="w-full justify-between truncate"
        >
          <span className="truncate">{displayText}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full max-h-60 overflow-auto">
        <DropdownMenuCheckboxItem
          checked={allSelected}
          onCheckedChange={handleSelectAll}
        >
          Select All
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selectedValues.includes(option.value)}
            onCheckedChange={(checked) => {
              const newValues = checked
                ? [...selectedValues, option.value]
                : selectedValues.filter((v) => v !== option.value);
              onChange(newValues);
            }}
            onSelect={(e) => e.preventDefault()}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
