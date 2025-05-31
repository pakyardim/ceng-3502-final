import express, { Router } from 'express';

import flightRoutes from './flights';

const router: Router = express.Router();

router.use('/flights', flightRoutes);

export default router;
