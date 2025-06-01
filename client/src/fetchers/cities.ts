import axios from 'axios';

export type City = {
  id: number;
  name: string;
};

export const fetchCities = async (): Promise<City[]> => {
  const response = await axios.get(`/cities`);
  return response.data;
};
