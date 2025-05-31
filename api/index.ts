import express from "express";
import cors from "cors";

import config from './src/config/config';
import { pool } from './src/config/database'

const app = express();
const port = config.port || 5000;

app.use(cors());
app.use(express.json());

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the MySQL database pool!');
    connection.release();
  } catch (err) {
    console.error('Error connecting to the database pool', err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log('Server is up on port ' + port);
  });
})();
