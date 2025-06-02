/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

type DataType = {
  passenger_name: string;
  passenger_surname: string;
  passenger_email: string;
  flight_id: number;
};

export type Ticket = {
  id: number;
  passenger_name: string;
  passenger_surname: string;
  passenger_email: string;
  flight_id: number;
  price: number;
  departure_time: string;
  arrival_time: string;
  from_city_name: string;
  to_city_name: string;
  seat_number?: string | null;
};

export const bookFlight = async (data: DataType) => {
  try {
    const method = 'POST';
    const url = '/tickets';

    const response = await axios({
      method,
      url,
      data,
    });

    return response.data;
  } catch (err: any) {
    throw new Error(err?.response.data.message || 'Failed to book the flight');
  }
};

export const getTickets = async (): Promise<Ticket[]> => {
  try {
    const method = 'GET';
    const url = '/tickets';

    const response = await axios({
      method,
      url,
    });

    return response.data;
  } catch (err: any) {
    throw new Error(err?.response.data.message || 'Failed to fetch tickets');
  }
};
