import { useState } from 'react';
import { ChevronsUpDown, MapPin } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  searchPlaceholder: string;
  options: { id: number | string; name: string }[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  pinColor?: string;
}

export function Combobox({
  searchPlaceholder,
  options,
  selectedValue,
  setSelectedValue,
  pinColor = 'text-blue-500',
}: Props) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-blue-200 hover:bg-blue-50"
        >
          <div className="flex items-center">
            <MapPin className={cn('mr-2 h-4 w-4', pinColor)} />
            {selectedValue ? selectedValue : 'Departure'}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onValueChange={(value) => setSearchValue(value)}
          />
          <CommandList>
            {/* <ScrollArea className="h-auto"> */}
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map(({ id, name }) =>
                id ? (
                  <CommandItem
                    key={id}
                    value={name}
                    className="cursor-pointer"
                    onSelect={(currentValue) => {
                      const id = options.find((option) => option.name === currentValue)?.id;
                      if (id) setSelectedValue(id.toString());
                      setOpen(false);
                    }}
                  >
                    {name}
                  </CommandItem>
                ) : null,
              )}
            </CommandGroup>
            {/* </ScrollArea> */}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
