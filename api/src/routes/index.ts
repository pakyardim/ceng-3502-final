import express, { Router } from 'express';

import cityRoutes from './cities';
import flightRoutes from './flights';
import ticketRoutes from './tickets';
import authenticationRoutes from './authentication';

const router: Router = express.Router();

router.use('/cities', cityRoutes);
router.use('/flights', flightRoutes);
router.use('/tickets', ticketRoutes);
router.use('/login', authenticationRoutes);

export default router;
