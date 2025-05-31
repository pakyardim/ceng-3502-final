import { Request, Response, NextFunction } from 'express';

import { fetchCities } from '../services/cities';

export const getCities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const flights = await fetchCities();
    res.status(200).send(flights);
  } catch (error) {
    next(error);
  }
};
