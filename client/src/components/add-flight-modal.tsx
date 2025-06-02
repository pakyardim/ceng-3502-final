import { Calendar, Clock, Plus, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import type { City } from '@/fetchers/cities';
import { Combobox } from './ui/combobox';
import { useMutation } from '@tanstack/react-query';
import { addFlight } from '@/fetchers/flights';
import { useSnackbar } from '@/contexts/snackbarContext';

interface Props {
  isAddFlightOpen: boolean;
  setIsAddFlightOpen: (open: boolean) => void;
  cities: City[];
}

export function AddFlightModal({ isAddFlightOpen, setIsAddFlightOpen, cities }: Props) {
  const { showSnackbar } = useSnackbar();

  const [departureDate, setDepartureDate] = useState<Date>();
  const [arrivalDate, setArrivalDate] = useState<Date>();

  const [flightData, setFlightData] = useState({
    fromCity: 0,
    toCity: 0,
    departureTime: '',
    arrivalTime: '',
    seatsTotal: '',
    price: '',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addFlight,
    retry: 1,
    onSuccess: () => {
      setFlightData({
        fromCity: 0,
        toCity: 0,
        departureTime: '',
        arrivalTime: '',
        seatsTotal: '',
        price: '',
      });
      setDepartureDate(undefined);
      setArrivalDate(undefined);
      setIsAddFlightOpen(false);
      showSnackbar('Flight created successfully!', 'success');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      showSnackbar(error?.response?.data?.error || 'Failed to book the flight', 'error');
    },
  });

  const handleFlightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFlightData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddFlight = async () => {
    if (
      !flightData.fromCity ||
      !flightData.toCity ||
      !departureDate ||
      !arrivalDate ||
      !flightData.departureTime ||
      !flightData.arrivalTime ||
      !flightData.seatsTotal ||
      !flightData.price
    ) {
      alert('Please fill in all required fields');
      return;
    }

    const newFlight = {
      ...flightData,
      departureDate: departureDate.toISOString().split('T')[0],
      arrivalDate: arrivalDate.toISOString().split('T')[0],
      fromCityLabel: cities.find((city) => city.id === flightData.fromCity)?.name,
      toCityLabel: cities.find((city) => city.id === flightData.toCity)?.name,
    };

    mutate({
      price: Number(newFlight.price),
      seats_total: Number(newFlight.seatsTotal),
      arrival_time: `${newFlight.arrivalDate}T${newFlight.arrivalTime}:00`,
      departure_time: `${newFlight.departureDate}T${newFlight.departureTime}:00`,
      from_city: newFlight.fromCity,
      to_city: newFlight.toCity,
    });
  };

  return (
    <Dialog open={isAddFlightOpen} onOpenChange={setIsAddFlightOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg">
          <Plus className="mr-2 h-4 w-4" />
          Add Flight
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Flight</DialogTitle>
          <DialogDescription>Create a new flight for customers to book</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>From City *</Label>
              <Combobox
                options={cities.filter((i) => i.id !== Number(flightData.toCity))}
                selectedValue={cities.find((i) => i.id === Number(flightData.fromCity))?.name || ''}
                setSelectedValue={(value) => {
                  setFlightData((prev) => ({ ...prev, fromCity: +value }));
                }}
                searchPlaceholder="Search city..."
              />
            </div>

            <div className="space-y-2">
              <Label>To City *</Label>
              <Combobox
                options={cities.filter((i) => i.id !== Number(flightData.fromCity))}
                selectedValue={cities.find((i) => i.id === Number(flightData.toCity))?.name || ''}
                setSelectedValue={(value) => {
                  setFlightData((prev) => ({ ...prev, toCity: +value }));
                }}
                searchPlaceholder="Search city..."
                pinColor="text-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Departure Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !departureDate && 'text-muted-foreground',
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4 text-emerald-500" />
                    {departureDate ? departureDate.toLocaleDateString() : 'Select departure date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={departureDate}
                    onSelect={setDepartureDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="departureTime">Departure Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-500" />
                <Input
                  id="departureTime"
                  name="departureTime"
                  type="time"
                  value={flightData.departureTime}
                  onChange={handleFlightInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Arrival Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !arrivalDate && 'text-muted-foreground',
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                    {arrivalDate ? arrivalDate.toLocaleDateString() : 'Select arrival date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={arrivalDate}
                    onSelect={setArrivalDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrivalTime">Arrival Time *</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-500" />
                <Input
                  id="arrivalTime"
                  name="arrivalTime"
                  type="time"
                  value={flightData.arrivalTime}
                  onChange={handleFlightInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="seatsTotal">Total Seats *</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                <Input
                  id="seatsTotal"
                  name="seatsTotal"
                  type="number"
                  placeholder="e.g., 300"
                  value={flightData.seatsTotal}
                  onChange={handleFlightInputChange}
                  className="pl-10"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (USD) *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="e.g., 599"
                  value={flightData.price}
                  onChange={handleFlightInputChange}
                  className="pl-10"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsAddFlightOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddFlight}
              disabled={isPending}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
            >
              {isPending ? 'Creating...' : 'Create Flight'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
