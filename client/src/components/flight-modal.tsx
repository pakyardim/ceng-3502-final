import { Check, Clock, CreditCard, User } from 'lucide-react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { cn, extractDateAndTime, findTimeDifference } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { Flight } from '@/fetchers/flights';

interface Props {
  flight: Flight;
  bookingStep: string;
  setBookingStep: (step: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  handleBookingSubmit: () => void;
  color: string;
  isPending?: boolean;
}

export function FlightModal({
  flight,
  bookingStep,
  setBookingStep,
  handleInputChange,
  formData,
  handleBookingSubmit,
  isPending,
  color,
}: Props) {
  const { time: departureTime } = extractDateAndTime(flight.departure_time);
  const { time: arrivalTime } = extractDateAndTime(flight.arrival_time);

  const duration = findTimeDifference(flight.departure_time, flight.arrival_time);

  const randomAirline = ['FlyTicket Airlines', 'SkyHigh Airways', 'CloudJet'].sort(
    () => 0.5 - Math.random(),
  )[0];

  const airline = randomAirline;

  const flightNumber = `FT${Math.floor(Math.random() * 900) + 100}`;
  const aircraft = ['Boeing 777', 'Airbus A320', 'Boeing 737'].sort(() => 0.5 - Math.random())[0];
  const stops = ['Non-stop', '1 Stop', '2 Stops'].sort(() => 0.5 - Math.random())[0];
  const amenities = ['WiFi', 'Meals', 'Entertainment', 'Power'].sort(() => 0.5 - Math.random()).slice(0, 3);
  const baggage = '1 checked bag included';
  const originalPrice = Math.random() > 0.5 ? `$${(flight.price + 100).toFixed(2)}` : null;

  return (
    <>
      <div className={`h-1 bg-gradient-to-r ${color}`} />

      <div className="px-6 py-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          {[
            { step: 'details', label: 'Flight Details', number: 1 },
            { step: 'payment', label: 'Passenger Info', number: 2 },
          ].map((item, index) => (
            <div key={item.step} className="flex items-center">
              <div className="flex items-center">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                    bookingStep === item.step
                      ? `bg-gradient-to-r ${color} text-white`
                      : item.number < (bookingStep === 'details' ? 1 : 2)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600',
                  )}
                >
                  {item.number < (bookingStep === 'details' ? 1 : 2) ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    item.number
                  )}
                </div>
                <span
                  className={cn(
                    'ml-2 text-sm font-medium',
                    bookingStep === item.step ? 'text-gray-900' : 'text-gray-500',
                  )}
                >
                  {item.label}
                </span>
              </div>
              {index < 2 && (
                <div
                  className={cn(
                    'w-12 h-px mx-4',
                    item.number < (bookingStep === 'details' ? 1 : 2) ? 'bg-green-500' : 'bg-gray-300',
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Tabs defaultValue="details" value={bookingStep} onValueChange={setBookingStep} className="w-full">
        <div className="px-6 py-3">
          <TabsContent value="details" className="mt-0">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6 pb-6 border-b">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-2xl font-bold text-gray-800">{departureTime}</div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className="w-12 h-px bg-gray-300"></div>
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{duration}</span>
                      <div className="w-12 h-px bg-gray-300"></div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{arrivalTime}</div>
                  </div>

                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-lg font-semibold text-gray-700">{airline}</div>
                    <Badge variant="secondary" className="text-xs">
                      {flightNumber}
                    </Badge>
                  </div>

                  <div className="text-sm text-gray-600 mb-2">
                    {aircraft} • {stops}
                  </div>
                </div>

                <div className="text-right">
                  <div className="mb-1">
                    {originalPrice && (
                      <div className="text-sm text-gray-400 line-through">{originalPrice}</div>
                    )}
                    <div
                      className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
                    >
                      ${flight.price}
                    </div>
                    <div className="text-sm text-gray-500">per person</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Flight Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Flight Number</span>
                      <span className="font-medium">{flightNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Aircraft</span>
                      <span className="font-medium">{aircraft}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium">{duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Distance</span>
                      <span className="font-medium">3,459 miles</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Baggage</span>
                      <span className="font-medium">{baggage}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Amenities & Services</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Power Outlets</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">USB Charging</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  className={`bg-gradient-to-r ${color} hover:opacity-90 text-white`}
                  onClick={() => setBookingStep('payment')}
                >
                  Continue to Passenger Info
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payment" className="mt-0">
            <div className="space-y-3">
              <div className="text-center mb-4">
                <div className="inline-block p-2 bg-gray-100 rounded-lg">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold mt-2">Passenger Information</h3>
                <p className="text-sm text-gray-500">Enter your details to complete the booking</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Booking Summary</h4>
                    <div className="text-sm text-gray-500 mt-1">
                      {flight.from_city_name} to {flight.to_city_name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent`}>
                      {flight.price}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setBookingStep('details')}>
                  Back to Flight Details
                </Button>
                <Button
                  className={`bg-gradient-to-r ${color} hover:opacity-90 text-white`}
                  onClick={handleBookingSubmit}
                  disabled={!formData.firstName || !formData.lastName || !formData.email || isPending}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Complete Booking
                </Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
}
