import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.getAllUserController);
router.get('/:id', UserController.getSingleUserController);
router.delete('/:id', UserController.deleteUserController);

router.patch('/:id', UserController.updateUserController);
export const UserRoutes = router;
