import request from 'supertest';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';

import app from '../../app';
import { pool } from '../config/database';

const testUsername = 'testadmin';
const testPassword = '123456';

beforeAll(async () => {
  const hashedPassword = await bcrypt.hash(testPassword, 10);

  await pool.execute('INSERT INTO admins (username, password) VALUES (?, ?)', [testUsername, hashedPassword]);
});

afterAll(async () => {
  await pool.execute('DELETE FROM admins WHERE username = ?', [testUsername]);
  await pool.end();
});

describe('POST /api/login', () => {
  it('should return token on correct credentials', async () => {
    const res = await request(app).post('/api/login').send({
      username: testUsername,
      password: testPassword,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET || '');
    expect(typeof decoded).toBe('object');
    expect((decoded as JwtPayload).id).toBeDefined();
  });

  it('should fail with wrong password', async () => {
    const res = await request(app).post('/api/login').send({
      username: testUsername,
      password: 'wrong',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/incorrect/i);
  });

  it('should return 400 on missing fields', async () => {
    const res = await request(app).post('/api/login').send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});
