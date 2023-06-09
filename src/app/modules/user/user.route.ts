import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import ValidateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/create-user',
  ValidateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

export const UserRoutes = router;
