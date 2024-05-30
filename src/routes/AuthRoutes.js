import express from 'express';
import AuthenticateUser from '../middleware/AuthMiddleware.js';
import AuthController from '../controllers/AuthController.js';
import {
  validateRequestBody,
  registerSchema,
  loginSchema,
} from '../utils/Validator.js';

const router = express.Router();

router.post(
  '/register',
  validateRequestBody(registerSchema),
  AuthController.registerUser,
);

router.post(
  '/login',
  validateRequestBody(loginSchema),
  AuthController.loginUser,
);

router.get('/logout', AuthenticateUser, AuthController.logoutUser);

router.get('/profile', AuthenticateUser, AuthController.getProfile);

export default router;
