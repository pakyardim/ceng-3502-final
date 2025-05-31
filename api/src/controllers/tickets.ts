import { Request, Response, NextFunction } from 'express';

import { checkValidationError } from '../utils/validation';
import { TicketModel } from '../models/tickets';
import { create, fetchTicket, fetchTickets } from '../services/tickets';
import { fetchFlightById } from '../services/flights';

export const createTicket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    checkValidationError(req);

    const { passenger_name, passenger_surname, passenger_email, flight_id, seat_number } = req.body;

    const flight = await fetchFlightById(flight_id);

    if (!flight) {
      throw res.status(404).send({ message: 'Flight not found' });
    }

    const ticket = new TicketModel(
      passenger_name,
      passenger_surname,
      passenger_email,
      flight_id,
      seat_number,
    );

    const newTicket = await create(ticket);

    res.status(201).send(newTicket);
  } catch (error) {
    next(error);
  }
};

export const getTickets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tickets = await fetchTickets();
    res.status(200).send(tickets);
  } catch (error) {
    next(error);
  }
};

export const getTicket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ticketId = parseInt(req.params.id, 10);
    const ticket = await fetchTicket(ticketId);

    if (!ticket) {
      throw res.status(404).send({ message: 'Ticket not found' });
    }

    res.status(200).send(ticket);
  } catch (error) {
    next(error);
  }
};
