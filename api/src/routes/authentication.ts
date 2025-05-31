import express from 'express';
import { body } from 'express-validator';

import { login } from '../controllers/authentication';

const router = express.Router();

router.post(
  '/',
  [(body('username').trim().not().isEmpty(), body('password').trim().isLength({ min: 5 }))],
  login,
);

export default router;
