import { useState } from 'react';
import { CalendarDays, Check, ChevronsUpDown, MapPin, Search } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

const cities = [
  { value: 'nyc', label: 'New York (NYC)' },
  { value: 'lax', label: 'Los Angeles (LAX)' },
  { value: 'lhr', label: 'London (LHR)' },
  { value: 'cdg', label: 'Paris (CDG)' },
  { value: 'nrt', label: 'Tokyo (NRT)' },
  { value: 'dxb', label: 'Dubai (DXB)' },
  { value: 'sin', label: 'Singapore (SIN)' },
  { value: 'hkg', label: 'Hong Kong (HKG)' },
  { value: 'syd', label: 'Sydney (SYD)' },
  { value: 'fra', label: 'Frankfurt (FRA)' },
  { value: 'ams', label: 'Amsterdam (AMS)' },
  { value: 'mad', label: 'Madrid (MAD)' },
  { value: 'bcn', label: 'Barcelona (BCN)' },
  { value: 'rom', label: 'Rome (FCO)' },
  { value: 'ist', label: 'Istanbul (IST)' },
  { value: 'bkk', label: 'Bangkok (BKK)' },
  { value: 'del', label: 'Delhi (DEL)' },
  { value: 'cai', label: 'Cairo (CAI)' },
  { value: 'jnb', label: 'Johannesburg (JNB)' },
  { value: 'gru', label: 'São Paulo (GRU)' },
];

export function SearchForm() {
  const [date, setDate] = useState<Date>();
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  return (
    <Card className="max-w-3xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* From City */}
          <div className="space-y-2">
            <Label htmlFor="from" className="text-gray-700 font-medium">
              From
            </Label>
            <Popover open={openFrom} onOpenChange={setOpenFrom}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openFrom}
                  className="w-full justify-between border-blue-200 hover:bg-blue-50"
                >
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-blue-500" />
                    {fromCity
                      ? cities.find((city) => city.value === fromCity)?.label
                      : 'Select departure city'}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search city..." />
                  <CommandList>
                    <CommandEmpty>No city found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-y-auto">
                      {cities.map((city) => (
                        <CommandItem
                          key={city.value}
                          value={city.value}
                          onSelect={(currentValue) => {
                            setFromCity(currentValue === fromCity ? '' : currentValue);
                            setOpenFrom(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              fromCity === city.value ? 'opacity-100 text-blue-500' : 'opacity-0',
                            )}
                          />
                          {city.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* To City */}
          <div className="space-y-2">
            <Label htmlFor="to" className="text-gray-700 font-medium">
              To
            </Label>
            <Popover open={openTo} onOpenChange={setOpenTo}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openTo}
                  className="w-full justify-between border-purple-200 hover:bg-purple-50"
                >
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-purple-500" />
                    {toCity ? cities.find((city) => city.value === toCity)?.label : 'Select destination city'}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search city..." />
                  <CommandList>
                    <CommandEmpty>No city found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-y-auto">
                      {cities.map((city) => (
                        <CommandItem
                          key={city.value}
                          value={city.value}
                          onSelect={(currentValue) => {
                            setToCity(currentValue === toCity ? '' : currentValue);
                            setOpenTo(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              toCity === city.value ? 'opacity-100 text-purple-500' : 'opacity-0',
                            )}
                          />
                          {city.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Departure Date */}
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Departure Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal border-emerald-200 hover:bg-emerald-50',
                    !date && 'text-muted-foreground',
                  )}
                >
                  <CalendarDays className="mr-2 h-4 w-4 text-emerald-500" />
                  {date ? date.toLocaleDateString() : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          size="lg"
        >
          <Search className="mr-2 h-4 w-4" />
          Search Flights
        </Button>
      </CardContent>
    </Card>
  );
}
