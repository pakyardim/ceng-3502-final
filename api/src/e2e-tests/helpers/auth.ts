import { Application } from 'express';
import jwt from 'jsonwebtoken';
import request, { Test } from 'supertest';

export const getTestToken = (userId = 1) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || '');
};

export const requestWithAuth = (app: Application) => {
  const token = getTestToken();

  return {
    get: (url: string): Test => request(app).get(url).set('Authorization', `Bearer ${token}`),
    post: (url: string): Test => request(app).post(url).set('Authorization', `Bearer ${token}`),
    put: (url: string): Test => request(app).put(url).set('Authorization', `Bearer ${token}`),
    delete: (url: string): Test => request(app).delete(url).set('Authorization', `Bearer ${token}`),
  };
};
