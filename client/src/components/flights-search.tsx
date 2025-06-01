import { CalendarDays, Plane } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';

import type { City } from '@/fetchers/cities';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Props {
  defaultDate: Date;
  defaultFromCity: string;
  defaultToCity: string;
  cities: City[];
}

export function FlightsSearchForm({ cities, defaultDate, defaultFromCity, defaultToCity }: Props) {
  const [date, setDate] = useState<Date>(defaultDate);
  const [fromCity, setFromCity] = useState(defaultFromCity);
  const [toCity, setToCity] = useState(defaultToCity);

  const navigate = useNavigate();

  const handleSearch = () => {
    const formattedDate = date?.toLocaleDateString('sv-SE');

    navigate(`/flights?to_city=${toCity}&from_city=${fromCity}&date=${formattedDate}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end w-full">
      <div className="space-y-2">
        <Label htmlFor="from" className="text-gray-700 font-medium">
          From
        </Label>
        <Combobox
          options={cities.filter((i) => i.id !== Number(toCity))}
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
          options={cities.filter((i) => i.id !== Number(fromCity))}
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
            <Calendar mode="single" selected={date} onSelect={(day) => day && setDate(day)} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      <Button
        className="h-9 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
        size="lg"
        onClick={handleSearch}
        disabled={!fromCity || !toCity || !date}
      >
        <Plane className="mr-2 h-4 w-4" />
        Search Flights
      </Button>
    </div>
  );
}
