import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/signup', UserController.createUserController);

export const AuthRoutes = router;
