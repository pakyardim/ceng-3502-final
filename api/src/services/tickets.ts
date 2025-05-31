import { ResultSetHeader } from 'mysql2';

import { pool } from '../config/database';
import { Ticket } from '../models/tickets';

interface ITicket extends Ticket, ResultSetHeader {}

export const create = async (ticketData: Ticket) => {
  try {
    const { passenger_name, passenger_surname, passenger_email, flight_id, seat_number } = ticketData;

    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO tickets (passenger_name, passenger_surname, passenger_email, flight_id, seat_number) VALUES (?, ?, ?, ?, ?)',
      [passenger_name, passenger_surname, passenger_email, flight_id, seat_number],
    );

    ticketData.id = result.insertId;
    return ticketData;
  } catch (error) {
    throw new Error('Failed to create ticket');
  }
};

export const fetchTickets = async () => {
  try {
    const [rows] = await pool.execute('SELECT * FROM tickets');
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
