import axios from 'axios';

export type Flight = {
  id: number;
  price: number;
  seats_total: number;
  arrival_time: string;
  departure_time: string;
  from_city: number;
  to_city: number;
  from_city_name?: string;
  to_city_name?: string;
  booked_seats?: number;
};

export const fetchAllFlights = async ({ pageParam }: { pageParam: number }) => {
  const response = await axios.get(`/flights?skip=${pageParam}&limit=6`);
  return response.data;
};

export const fetchSearchFlights = async (searchParams: {
  from_city: string;
  to_city: string;
  departure_time: string;
}) => {
  const { from_city, to_city, departure_time } = searchParams;
  const response = await axios.get(`/flights/search`, {
    params: { from_city, to_city, departure_time },
  });
  return response.data;
};

export const addFlight = async (flight: Omit<Flight, 'id'>) => {
  const response = await axios.post('/flights', flight);
  return response.data;
};
