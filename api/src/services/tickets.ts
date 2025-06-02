import { ResultSetHeader } from 'mysql2';

import { pool } from '../config/database';
import { Ticket } from '../models/tickets';

interface ITicket extends Ticket, ResultSetHeader {}

export const create = async (ticketData: Ticket) => {
  try {
    const { passenger_name, passenger_surname, passenger_email, flight_id } = ticketData;

    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO tickets (passenger_name, passenger_surname, passenger_email, flight_id, seat_number) VALUES (?, ?, ?, ?, ?)',
      [passenger_name, passenger_surname, passenger_email, flight_id, null],
    );

    ticketData.id = result.insertId;
    return ticketData;
  } catch (error) {
    throw new Error('Failed to create ticket');
  }
};

export const fetchTickets = async () => {
  try {
    const [rows] = await pool.execute(`
      SELECT t.*, f.price, f.departure_time, f.arrival_time, c.name AS from_city_name, c2.name AS to_city_name
      FROM tickets t
      LEFT JOIN flights f ON f.id = t.flight_id
      LEFT JOIN cities c ON f.from_city = c.id
      LEFT JOIN cities c2 ON f.to_city = c2.id
      `);
    return rows;
  } catch (error) {
    throw new Error('Failed to fetch tickets');
  }
};

export const fetchTicket = async (id: number) => {
  try {
    const [rows] = await pool.execute<ITicket[]>('SELECT * FROM tickets WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    throw new Error('Failed to fetch ticket');
  }
};
