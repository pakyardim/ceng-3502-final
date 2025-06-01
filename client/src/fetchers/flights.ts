import axios from 'axios';

export const fetchAllFlights = async ({ pageParam }: { pageParam: number }) => {
  const response = await axios.get(`/flights?skip=${pageParam}&limit=6`);
  return response.data;
};
