import { useSearchParams } from 'react-router';

import { fetchSearchFlights, type Flight } from '@/fetchers/flights';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import { DetailedFlightCard } from '@/components/detailed-flight-card';
import { FLIGHT_COLORS } from '@/lib/utils';
import { fetchCities } from '@/fetchers/cities';
import { FlightsSearchForm } from '@/components/flights-search';
import { useState } from 'react';
import { FlightDialog } from '@/components/flight-dialog';

export default function FlightResultsPage() {
  const [searchParams] = useSearchParams();
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fromCity = searchParams.get('from_city') || '';
  const toCity = searchParams.get('to_city') || '';
  const date = searchParams.get('date') || '';

  const { data: citiesData } = useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
  });

  const { data, status } = useQuery({
    queryKey: ['flightResults', fromCity, toCity, date],
    queryFn: () =>
      fetchSearchFlights({
        from_city: fromCity,
        to_city: toCity,
        departure_time: date,
      }),
  });

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setIsModalOpen(true);
  };

  const flights = data || [];
  const cities = citiesData || [];

  const selectedFromCity = cities.find((city) => city.id === +fromCity)?.name || 'New York (NYC)';
  const selectedToCity = cities.find((city) => city.id === +toCity)?.name || 'London (LHR)';

  return (
    <>
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <FlightsSearchForm
              cities={cities}
              defaultDate={new Date(date)}
              defaultFromCity={fromCity}
              defaultToCity={toCity}
            />
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {status === 'pending' && (
              <div className="w-full min-h-56 flex justify-center">
                <Spinner />
              </div>
            )}

            {status === 'success' && (
              <div className="flex-1 max-w-6xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {flights.length} flight{flights.length === 1 ? '' : 's'} found
                  </h2>
                  <p className="text-gray-600">
                    Showing flights from {selectedFromCity} to {selectedToCity}
                  </p>
                </div>

                <div className="space-y-4">
                  {flights.map((flight: Flight) => (
                    <DetailedFlightCard
                      key={flight.id}
                      arrival_time={flight.arrival_time}
                      departure_time={flight.departure_time}
                      color={FLIGHT_COLORS[flight.id % FLIGHT_COLORS.length]}
                      price={flight.price}
                      onSelectFlight={() => handleSelectFlight(flight)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <FlightDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedFlight={selectedFlight}
        setSelectedFlight={setSelectedFlight}
      />
    </>
  );
}
