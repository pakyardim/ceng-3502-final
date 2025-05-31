import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { checkValidationError } from '../utils/validation';
import { findByUsername } from '../services/admins';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    checkValidationError(req);
    const { username, password } = req.body;

    const user = await findByUsername(username);

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw res.status(401).send({
        message: 'The username or the password is incorrect!',
      });
    }

    const token = generateToken(user.id);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const generateToken = (user_id: number) => {
  return jwt.sign({ id: user_id }, process.env.JWT_SECRET || '');
};
