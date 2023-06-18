import express from 'express';
import { AuthRoutes } from '../modules/userAuth/user.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { CowRoutes } from '../modules/cow/cow.routes';
import { OrderRoutes } from '../modules/order/order.routes';

const router = express.Router();

//signup
router.use('/auth', AuthRoutes);

// router.use('/users', UserRoutes);

const moduleRoutes = [
  {
    path: '/users',
    routeName: UserRoutes,
  },
  {
    path: '/cows',
    routeName: CowRoutes,
  },
  {
    path: '/orders',
    routeName: OrderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routeName));

export default router;
