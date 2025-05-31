import { RowDataPacket } from 'mysql2';

import { pool } from '../config/database';

interface IAdmin extends RowDataPacket {
  id: number;
  username: string;
  password: string;
}

export const findByUsername = async (username: string) => {
  try {
    const [rows] = await pool.query<IAdmin[]>('SELECT * FROM admins WHERE username = ?', [username]);
    return rows[0];
  } catch (error) {
    throw new Error('Failed to find admin by username');
  }
};
