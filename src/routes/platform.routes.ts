import { Router } from 'express';
import * as platformController from '../controllers/platform.controller';

const router = Router();

router.route('/')
  .post(platformController.createPlatform)
  .get(platformController.getPlatforms);

router.route('/:id')
  .get(platformController.getPlatformById)
  .put(platformController.updatePlatform)
  .delete(platformController.deletePlatform);

export default router;
