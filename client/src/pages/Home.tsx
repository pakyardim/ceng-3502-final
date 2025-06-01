import { Button } from '@/components/ui/button';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { SearchForm } from '@/components/search';
import { FlightCard } from '@/components/flight-card';

const flightColors = [
  'from-blue-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-red-600',
  'from-pink-500 to-rose-600',
  'from-indigo-500 to-blue-600',
  'from-violet-500 to-purple-600',
];

const flights = [
  {
    id: 1,
    from: 'New York (NYC)',
    to: 'London (LHR)',
    price: '$599',
    date: 'Dec 15, 2024',
    time: '8:30 AM - 8:45 PM',
    duration: '7h 15m',
    airline: 'British Airways',
    stops: 'Non-stop',
  },
  {
    id: 2,
    from: 'Los Angeles (LAX)',
    to: 'Tokyo (NRT)',
    price: '$899',
    date: 'Dec 16, 2024',
    time: '11:00 AM - 3:30 PM+1',
    duration: '11h 30m',
    airline: 'Japan Airlines',
    stops: 'Non-stop',
  },
  {
    id: 3,
    from: 'Chicago (ORD)',
    to: 'Paris (CDG)',
    price: '$749',
    date: 'Dec 17, 2024',
    time: '6:15 PM - 12:30 PM+1',
    duration: '8h 15m',
    airline: 'Air France',
    stops: 'Non-stop',
  },
  {
    id: 4,
    from: 'Miami (MIA)',
    to: 'Barcelona (BCN)',
    price: '$679',
    date: 'Dec 18, 2024',
    time: '10:45 PM - 3:15 PM+1',
    duration: '8h 30m',
    airline: 'Iberia',
    stops: 'Non-stop',
  },
  {
    id: 5,
    from: 'San Francisco (SFO)',
    to: 'Amsterdam (AMS)',
    price: '$829',
    date: 'Dec 19, 2024',
    time: '1:20 PM - 10:45 AM+1',
    duration: '10h 25m',
    airline: 'KLM',
    stops: 'Non-stop',
  },
  {
    id: 6,
    from: 'Boston (BOS)',
    to: 'Rome (FCO)',
    price: '$699',
    date: 'Dec 20, 2024',
    time: '9:30 PM - 2:15 PM+1',
    duration: '8h 45m',
    airline: 'Alitalia',
    stops: 'Non-stop',
  },
];

export default function Home() {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <section className="relative">
        <div className="relative h-[500px] overflow-hidden">
          <img
            src="/plane-flying-into-sun.jpeg"
            alt="Airplane flying through clouds"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 via-purple-600/60 to-pink-600/70" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="text-center text-white mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Find Your Perfect Flight</h1>
              <p className="text-xl md:text-2xl opacity-90 drop-shadow-md">
                Discover amazing destinations at unbeatable prices
              </p>
            </div>

            <SearchForm />
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Available Flights
            </h2>
            <p className="text-gray-600">Choose from our selection of flights</p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {flights.map((flight) => (
              <FlightCard key={flight.id} color={flightColors[flight.id % flightColors.length]} {...flight} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="border-blue-300 text-blue-600 hover:bg-blue-50">
              Load More Flights
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
