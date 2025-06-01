/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

type DataType = {
  passenger_name: string;
  passenger_surname: string;
  passenger_email: string;
  flight_id: number;
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
