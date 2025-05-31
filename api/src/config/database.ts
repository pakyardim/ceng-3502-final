import mysql from 'mysql2/promise';

const config = {
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    waitForConnections: true,
    multipleStatements: true,
    queueLimit: 0,
}

export const pool = mysql.createPool(config);