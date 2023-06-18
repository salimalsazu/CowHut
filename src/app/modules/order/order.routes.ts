import express from 'express';
import { OrdersController } from './order.controller';

const router = express.Router();

router.post('/', OrdersController.createOrderController);


router.get('/', OrdersController.getAllOrdersController);

export const OrderRoutes = router;
