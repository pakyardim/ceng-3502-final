import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

interface AuthRequest extends Request {
  userId: number;
}

export default (async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === 'string') {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Invalid or expired token' });
    next(err);
  }
}) as RequestHandler;
