import { useState } from 'react';
import { CalendarDays, Search } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';

import type { City } from '@/fetchers/cities';
import { cn } from '@/lib/utils';

interface Props {
  cities: City[];
}

export function SearchForm({ cities }: Props) {
  const [date, setDate] = useState<Date>();
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');

  return (
    <Card className="max-w-3xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from" className="text-gray-700 font-medium">
              From
            </Label>
            <Combobox
              options={cities}
              selectedValue={cities.find((i) => i.id === Number(fromCity))?.name || ''}
              setSelectedValue={(value) => {
                setFromCity(value);
              }}
              searchPlaceholder="Search city..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="to" className="text-gray-700 font-medium">
              To
            </Label>
            <Combobox
              options={cities}
              selectedValue={cities.find((i) => i.id === Number(toCity))?.name || ''}
              setSelectedValue={(value) => {
                setToCity(value);
              }}
              searchPlaceholder="Search city..."
              pinColor="text-purple-500"
            />
          </div>

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
