import request from 'supertest';

import app from '../../app';
import { pool } from '../config/database';
import { aFlight, createFlight } from './helpers/flights';
import { requestWithAuth } from './helpers/auth';

describe('Flights', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM flights');
  });

  afterAll(async () => {
    await pool.query('DELETE FROM flights');
    await pool.end();
  });

  it('should fetch all available flights', async () => {
    await createFlight(aFlight({ price: 300 }));
    const response = await request(app).get('/api/flights');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          price: 300,
        }),
      ]),
    );
  });

  it('should search flights by origin, destination, and date', async () => {
    const flightData = aFlight({
      price: 200,
      from_city: 1,
      to_city: 2,
      departure_time: new Date('2026-10-01T10:00:00Z'),
      arrival_time: new Date('2026-10-01T12:00:00Z'),
    });

    await createFlight(flightData);

    const response = await request(app)
      .get('/api/flights/search')
      .query({ from_city: 1, to_city: 2, departure_time: '2026-10-01' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          price: flightData.price,
          from_city: flightData.from_city,
          to_city: flightData.to_city,
        }),
      ]),
    );
  });

  it('should create a flight', async () => {
    const flightData = aFlight({ price: 250 });
    const response = await requestWithAuth(app).post('/api/flights').send(flightData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        price: flightData.price,
        seats_total: flightData.seats_total,
        arrival_time: flightData.arrival_time.toISOString(),
        departure_time: flightData.departure_time.toISOString(),
        from_city: flightData.from_city,
        to_city: flightData.to_city,
      }),
    );
  });

  it('should handle flight creation errors', async () => {
    const flightData = aFlight({ price: -100 });
    const response = await requestWithAuth(app).post('/api/flights').send(flightData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'price Invalid value',
      }),
    );
  });

  it('should update a flight', async () => {
    const createdFlight = await createFlight(aFlight({ price: 300 }));

    const updatedFlight = aFlight({ price: 350 });
    const response = await requestWithAuth(app)
      .put(`/api/flights/${createdFlight.insertId}`)
      .send(updatedFlight);

    expect(response.status).toBe(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        price: updatedFlight.price,
        seats_total: updatedFlight.seats_total,
        arrival_time: updatedFlight.arrival_time.toISOString(),
        departure_time: updatedFlight.departure_time.toISOString(),
        from_city: updatedFlight.from_city,
        to_city: updatedFlight.to_city,
      }),
    );
  });

  it('should delete a flight', async () => {
    const createdFlight = await createFlight(aFlight());

    const response = await requestWithAuth(app).delete(`/api/flights/${createdFlight.insertId}`);

    expect(response.status).toBe(204);

    const getResponse = await request(app).get('/api/flights');
    expect(getResponse.body).toEqual(
      expect.not.arrayContaining([expect.objectContaining({ id: createdFlight.insertId })]),
    );
  });
});
