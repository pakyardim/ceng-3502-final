import { pool } from '../config/database';

export const fetchCities = async () => {
  try {
    const query = 'SELECT * FROM cities';

    const [rows] = await pool.execute(query);
    return rows;
  } catch (error) {
    throw new Error('Failed to search flights');
  }
};
