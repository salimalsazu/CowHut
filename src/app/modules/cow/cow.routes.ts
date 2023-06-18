import express from 'express';
import { CowsController } from './cow.controller';

const router = express.Router();

router.post('/', CowsController.createCowController);

router.get('/', CowsController.getAllCowsController);

router.get('/:id', CowsController.getSingleCowsController);

router.patch('/:id', CowsController.updateSingleCowsController);

router.delete('/:id', CowsController.deleteSingleCowsController);

export const CowRoutes = router;
