import express from 'express';
import { body, param, query } from 'express-validator';

import { getFlights, createFlight, updateFlight, deleteFlight, searchFlights } from '../controllers/flight';
import auth from '../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .get([query('skip').optional().isString(), query('limit').optional().isString()], getFlights)
  .post(
    auth,
    [
      body('price').exists().isFloat({ min: 0 }),
      body('seats_total').exists().isInt(),
      body('arrival_time').exists().isString(),
      body('departure_time').exists().isString(),
      body('from_city').exists().isInt(),
      body('to_city').exists().isInt(),
    ],
    createFlight,
  );

router.get(
  '/search',
  [
    query('from_city').exists().isInt(),
    query('to_city').exists().isInt(),
    query('departure_time').exists().isString(),
  ],
  searchFlights,
);

router
  .route('/:id')
  .put(
    auth,
    [
      param('id').exists().isInt(),
      body('price').optional().isNumeric(),
      body('seats_total').optional().isInt(),
      body('arrival_time').optional().isString(),
      body('departure_time').optional().isString(),
      body('from_city').optional().isInt(),
      body('to_city').optional().isInt(),
    ],
    updateFlight,
  )
  .delete(auth, [param('id').exists().isInt()], deleteFlight);

export default router;
