import { Request, Response, NextFunction } from 'express';

import { FlightModel } from '../models/flights';
import { checkValidationError } from '../utils/validation';
import { create, deleteFlightById, fetchFlights, update, fetchAllFlights } from '../services/flights';

export const createFlight = async (req: Request, res: Response, next: NextFunction) => {
  try {
    checkValidationError(req);

    const { price, seats_total, arrival_time, departure_time, from_city, to_city } = req.body;

    const flight = new FlightModel(
      price,
      seats_total,
      new Date(arrival_time),
      new Date(departure_time),
      from_city,
      to_city,
    );

    const newFlight = await create(flight);

    res.status(201).send(newFlight);
  } catch (error) {
    next(error);
  }
};

export const getFlights = async (req: Request, res: Response, next: NextFunction) => {
  try {
    checkValidationError(req);
    const skip = (req.query.skip as string) || '0';
    const limit = (req.query.limit as string) || '10';

    const flights = await fetchAllFlights(skip, limit);

    const hasMore = flights.length === parseInt(limit);

    res.status(200).send({ flights, hasMore });
  } catch (error) {
    next(error);
  }
};

export const searchFlights = async (req: Request, res: Response, next: NextFunction) => {
  try {
    checkValidationError(req);
    const { from_city, to_city, departure_time } = req.query;

    const flights = await fetchFlights(
      from_city ? parseInt(from_city as string, 10) : undefined,
      to_city ? parseInt(to_city as string, 10) : undefined,
      departure_time ? new Date(departure_time as string) : undefined,
    );

    res.status(200).send(flights);
  } catch (error) {
    next(error);
  }
};

export const updateFlight = async (req: Request, res: Response, next: NextFunction) => {
  try {
    checkValidationError(req);

    const id = parseInt(req.params.id, 10);
    const { price, seats_total, arrival_time, departure_time, from_city, to_city } = req.body;

    const flight = new FlightModel(
      price,
      seats_total,
      new Date(arrival_time),
      new Date(departure_time),
      from_city,
      to_city,
    );

    const updatedFlight = await update(id, flight);

    res.status(200).send(updatedFlight);
  } catch (error) {
    next(error);
  }
};

export const deleteFlight = async (req: Request, res: Response, next: NextFunction) => {
  try {
    checkValidationError(req);
    const id = parseInt(req.params.id, 10);

    await deleteFlightById(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
