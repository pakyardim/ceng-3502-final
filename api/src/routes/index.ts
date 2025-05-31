import express, { Router } from 'express';

import flightRoutes from './flights';
import authenticationRoutes from './authentication';

const router: Router = express.Router();

router.use('/flights', flightRoutes);
router.use('/login', authenticationRoutes);

export default router;
