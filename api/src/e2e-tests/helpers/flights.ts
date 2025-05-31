import { ResultSetHeader } from 'mysql2';
import { pool } from '../../config/database';
import { Flight } from '../../models/flights';

export const aFlight = (overrides?: Partial<Flight>): Flight => {
  return {
    price: overrides && overrides.hasOwnProperty('price') ? overrides.price! : 200,
    seats_total: overrides && overrides.hasOwnProperty('seats_total') ? overrides.seats_total! : 150,
    arrival_time: overrides && overrides.hasOwnProperty('arrival_time') ? overrides.arrival_time! : new Date('2025-10-01T12:00:00Z'),
    departure_time: overrides && overrides.hasOwnProperty('departure_time') ? overrides.departure_time! : new Date('2025-10-01T10:00:00Z'),
    from_city: overrides && overrides.hasOwnProperty('from_city') ? overrides.from_city! : 1,
    to_city: overrides && overrides.hasOwnProperty('to_city') ? overrides.to_city! : 2,
  };
};

export const createFlight = async (flightData: Flight) => {
  try {
    const { price, seats_total, arrival_time, departure_time, from_city, to_city } = flightData;
    const query = 'INSERT INTO flights (price, seats_total, arrival_time, departure_time, from_city, to_city) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await pool.execute<ResultSetHeader>(query, [price, seats_total, arrival_time, departure_time, from_city, to_city]);
    return result;
  } catch (error) {
    throw new Error('Failed to create flight');
  }
};
