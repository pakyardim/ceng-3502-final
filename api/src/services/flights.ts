import { ResultSetHeader } from 'mysql2';

import { pool } from '../config/database';
import { Flight } from '../models/flights';

interface IFlight extends Flight, ResultSetHeader {}

export const fetchFlights = async (from_city?: number, to_city?: number, departure_time?: Date) => {
  try {
    const query = `
      SELECT f.*, COUNT(t.id) AS booked_seats
      FROM flights f
      LEFT JOIN tickets t ON f.id = t.flight_id
      WHERE f.departure_time > NOW()
      ${from_city ? 'AND f.from_city = ?' : ''}
      ${to_city ? 'AND f.to_city = ?' : ''}
      ${departure_time ? 'AND DATE(f.departure_time) = ?' : ''}
      GROUP BY f.id
      HAVING booked_seats < f.seats_total;
    `;

    const params: (number | string)[] = [];
    if (from_city) params.push(from_city);
    if (to_city) params.push(to_city);
    if (departure_time) params.push(departure_time.toISOString().split('T')[0]);

    const [rows] = await pool.execute(query, params);
    return rows;
  } catch (error) {
    throw new Error('Failed to search flights');
  }
};

export const create = async (flightData: Flight) => {
  try {
    const { price, seats_total, arrival_time, departure_time, from_city, to_city } = flightData;

    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO flights (price, seats_total, arrival_time, departure_time, from_city, to_city) VALUES (?, ?, ?, ?, ?, ?)',
      [price, seats_total, arrival_time, departure_time, from_city, to_city],
    );

    flightData.id = result.insertId;
    return flightData;
  } catch (error) {
    throw new Error('Failed to create flight');
  }
};

export const update = async (id: number, flightData: Partial<Flight>) => {
  try {
    const { price, seats_total, arrival_time, departure_time, from_city, to_city } = flightData;

    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE flights SET price = ?, seats_total = ?, arrival_time = ?, departure_time = ?, from_city = ?, to_city = ? WHERE id = ?',
      [price, seats_total, arrival_time, departure_time, from_city, to_city, id],
    );

    if (result.affectedRows === 0) {
      throw new Error('Flight not found');
    }

    return { ...flightData, id };
  } catch (error) {
    throw new Error('Failed to update flight');
  }
};

export const deleteFlightById = async (id: number) => {
  try {
    const [result] = await pool.execute<ResultSetHeader>('DELETE FROM flights WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      throw new Error('Flight not found');
    }

    return { message: 'Flight deleted successfully' };
  } catch (error) {
    throw new Error('Failed to delete flight');
  }
};

export const fetchFlightById = async (id: number) => {
  const [rows] = await pool.execute<IFlight[]>('SELECT * FROM flights WHERE id = ?', [id]);
  return rows[0];
};
