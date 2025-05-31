import request from 'supertest';

import app from '../../app';
import { pool } from '../config/database';
import { aFlight, createFlight } from './helpers/flights';
import { requestWithAuth } from './helpers/auth';
import { aTicket, createTicket } from './helpers/tickets';

describe('Tickets', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM tickets');
    await pool.query('DELETE FROM flights');
  });

  afterAll(async () => {
    await pool.query('DELETE FROM tickets');
    await pool.query('DELETE FROM flights');
    await pool.end();
  });

  it('should create a ticket', async () => {
    const flight = await createFlight(aFlight());

    const ticketData = aTicket({ flight_id: flight.id });

    const response = await request(app).post('/api/tickets').send(ticketData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        passenger_name: ticketData.passenger_name,
        passenger_surname: ticketData.passenger_surname,
        passenger_email: ticketData.passenger_email,
        flight_id: ticketData.flight_id,
        seat_number: ticketData.seat_number,
      }),
    );
  });

  it('should give error for non-existent flight', async () => {
    const ticketData = aTicket({ flight_id: 999 });

    const response = await request(app).post('/api/tickets').send(ticketData);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Flight not found',
      }),
    );
  });

  it('should fetch all tickets', async () => {
    const flight = await createFlight(aFlight());
    const ticket = await createTicket(aTicket({ flight_id: flight.id, seat_number: 15 }));

    const response = await requestWithAuth(app).get('/api/tickets');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flight_id: flight.id,
          passenger_name: ticket.passenger_name,
          seat_number: 15,
        }),
      ]),
    );
  });

  it('should fetch a specific ticket', async () => {
    const flight = await createFlight(aFlight());
    const ticket = await createTicket(aTicket({ flight_id: flight.id, seat_number: 20 }));

    const response = await request(app).get(`/api/tickets/${ticket.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: ticket.id,
        flight_id: flight.id,
        passenger_name: ticket.passenger_name,
        seat_number: 20,
      }),
    );
  });
});
