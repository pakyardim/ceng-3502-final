import { Plane } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { extractDateAndTime, findTimeDifference } from '@/lib/utils';

interface Props {
  color: string;
  price: number;
  to_city_name: string;
  from_city_name: string;
  departure_time: string;
  arrival_time: string;
}

export function FlightCard({
  color,
  price,
  to_city_name,
  from_city_name,
  departure_time,
  arrival_time,
}: Props) {
  const { date, time } = extractDateAndTime(departure_time);
  const duration = findTimeDifference(departure_time, arrival_time);

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group">
      <div className={`h-1 bg-gradient-to-r ${color}`} />
      <CardContent className="p-6 bg-white group-hover:bg-gray-50 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <div className="text-lg font-semibold text-gray-800">{from_city_name}</div>
              <div className={`p-1 rounded-full bg-gradient-to-r ${color}`}>
                <Plane className="h-3 w-3 text-white" />
              </div>
              <div className="text-lg font-semibold text-gray-800">{to_city_name}</div>
            </div>
            <div className="text-sm text-gray-600 mb-1 font-medium">FlyTicket Airlines • Non-stop</div>
            <div className="text-sm text-gray-500">
              {time} • {duration}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="text-center md:text-right">
              <div className="text-sm text-gray-500 font-medium">{date}</div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                ${price}
              </div>
              <div className="text-xs text-gray-400">per person</div>
            </div>
            <Button className={`md:ml-4 bg-gradient-to-r ${color} hover:opacity-90 text-white shadow-md`}>
              Select Flight
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
