import { Clock, Star } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { extractDateAndTime, findTimeDifference } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Props {
  color: string;
  price: number;
  departure_time: string;
  arrival_time: string;
  onSelectFlight: () => void;
}

export function DetailedFlightCard({ color, price, arrival_time, departure_time, onSelectFlight }: Props) {
  const { time: departureTime } = extractDateAndTime(departure_time);
  const { time: arrivalTime } = extractDateAndTime(arrival_time);

  const duration = findTimeDifference(departure_time, arrival_time);

  const randomAirline = ['FlyTicket Airlines', 'SkyHigh Airways', 'CloudJet'].sort(
    () => 0.5 - Math.random(),
  )[0];
  const airline = randomAirline;

  const randomRating = Math.floor(Math.random() * 5) + 1;

  const flightNumber = `FT${Math.floor(Math.random() * 900) + 100}`;
  const aircraft = ['Boeing 777', 'Airbus A320', 'Boeing 737'].sort(() => 0.5 - Math.random())[0];
  const stops = ['Non-stop', '1 Stop', '2 Stops'].sort(() => 0.5 - Math.random())[0];
  const amenities = ['WiFi', 'Meals', 'Entertainment', 'Power'].sort(() => 0.5 - Math.random()).slice(0, 3);
  const baggage = '1 checked bag included';
  const originalPrice = Math.random() > 0.5 ? `$${(price + 100).toFixed(2)}` : null;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 overflow-hidden">
      <div className={`h-1 bg-gradient-to-r ${color}`} />
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-xl font-bold text-gray-800">{departureTime}</div>
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-8 h-px bg-gray-300"></div>
                <Clock className="h-4 w-4" />
                <span className="text-sm">{duration}</span>
                <div className="w-8 h-px bg-gray-300"></div>
              </div>
              <div className="text-xl font-bold text-gray-800">{arrivalTime}</div>
            </div>

            <div className="flex items-center gap-4 mb-2">
              <div className="text-lg font-semibold text-gray-700">{airline}</div>
              <Badge variant="secondary" className="text-xs">
                {flightNumber}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600">{randomRating}</span>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-2">
              {aircraft} • {stops}
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              {amenities.map((amenity) => (
                <Badge key={amenity} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
            </div>

            <div className="text-sm text-gray-500">{baggage}</div>
          </div>

          <div className="lg:text-right">
            <div className="mb-2">
              {originalPrice && <div className="text-sm text-gray-400 line-through">{originalPrice}</div>}
              <div className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                ${price}
              </div>
              <div className="text-sm text-gray-500">per person</div>
            </div>

            <Button
              onClick={onSelectFlight}
              className={`w-full lg:w-auto bg-gradient-to-r ${color} hover:opacity-90 text-white shadow-md`}
            >
              Select Flight
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
