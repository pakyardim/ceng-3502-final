import { Ticket, TicketModel } from '../../models/tickets';
import { create } from '../../services/tickets';

export const aTicket = (overrides?: Partial<Ticket>): Ticket => {
  return {
    passenger_name:
      overrides && overrides.hasOwnProperty('passenger_name') ? overrides.passenger_name! : 'John',
    passenger_surname:
      overrides && overrides.hasOwnProperty('passenger_surname') ? overrides.passenger_surname! : 'Doe',
    passenger_email:
      overrides && overrides.hasOwnProperty('passenger_email')
        ? overrides.passenger_email!
        : 'johndoe@gmail.com',
    flight_id: overrides && overrides.hasOwnProperty('flight_id') ? overrides.flight_id! : 1,
    seat_number: overrides && overrides.hasOwnProperty('seat_number') ? overrides.seat_number! : 15,
  };
};

export const createTicket = async (ticketData: TicketModel) => {
  try {
    const { flight_id, passenger_email, passenger_name, passenger_surname, seat_number } = ticketData;

    const ticket = new TicketModel(
      passenger_name,
      passenger_surname,
      passenger_email,
      flight_id,
      seat_number,
    );

    const newTicket = await create(ticket);

    return newTicket;
  } catch (error) {
    throw new Error('Failed to create flight');
  }
};
