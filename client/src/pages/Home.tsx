import { Button } from '@/components/ui/button';
import { SearchForm } from '@/components/search';
import { FlightCard } from '@/components/flight-card';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchAllFlights } from '@/fetchers/flights';
import { Spinner } from '@/components/ui/spinner';
import { fetchCities } from '@/fetchers/cities';
import { FLIGHT_COLORS } from '@/lib/utils';

export default function Home() {
  const { data: citiesData } = useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
  });

  const { data, status, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: ['allFlights'],
    queryFn: fetchAllFlights,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const currentFlightCount = pages.flatMap((page) => page.flights).length;

      return lastPage.hasMore ? currentFlightCount : undefined;
    },
  });

  const cities = citiesData || [];

  const flights = data?.pages.flatMap((page) => page.flights) || [];
  const hasMore = data?.pages[data.pages.length - 1]?.hasMore;

  return (
    <>
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

            <SearchForm cities={cities} />
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
            {status === 'pending' && (
              <div className="w-full flex justify-center">
                <Spinner />
              </div>
            )}
            {status === 'error' && (
              <div className="text-red-500 text-center">
                <p>Error loading flights. Please try again later.</p>
                <Button variant="outline" size="lg" onClick={() => refetch()}>
                  Retry
                </Button>
              </div>
            )}
            {status === 'success' && flights.length === 0 && (
              <div className="text-gray-500 text-center">
                <p>No flights available at the moment. Please check back later.</p>
              </div>
            )}
            {status === 'success' &&
              flights?.length > 0 &&
              flights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  color={FLIGHT_COLORS[flight.id % FLIGHT_COLORS.length]}
                  {...flight}
                />
              ))}
          </div>

          {status === 'success' && flights?.length > 0 && hasMore && (
            <div className="text-center mt-8">
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                variant="outline"
                size="lg"
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                Load More Flights
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
