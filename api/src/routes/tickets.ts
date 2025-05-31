import express from 'express';
import { body, param } from 'express-validator';

import { getTickets, createTicket, getTicket } from '../controllers/tickets';
import auth from '../middlewares/auth';

const router = express.Router();

router
  .route('/')
  .get(auth, getTickets)
  .post(
    [
      body('passenger_name').trim().exists().isString(),
      body('passenger_surname').trim().exists().isString(),
      body('passenger_email').trim().exists().isEmail(),
      body('flight_id').exists().isInt(),
      body('seat_number').exists().isInt(),
    ],
    createTicket,
  );

router.get('/:id', [param('id').exists().isInt()], getTicket);

export default router;
