import express from 'express';
import checkAuth from '../middleware/AuthMiddleware.js';
import AuthController from '../controllers/AuthController.js';
import {
  validateRequestBody,
  validateParams,
  registerSchema,
  loginSchema,
  resendEmailSchema,
  resetPasswordRequestSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from '../utils/Validator.js';
import { loginLimiter } from '../middleware/RateLimitMiddleware.js';

const router = express.Router();

router.post(
  '/register',
  validateRequestBody(registerSchema),
  AuthController.register,
);
router.get(
  '/verify/:emailToken/:userId',
  validateParams(verifyEmailSchema),
  AuthController.verify,
);
router.post(
  '/login',
  loginLimiter,
  validateRequestBody(loginSchema),
  AuthController.login,
);
router.post(
  '/resend-email-token',
  validateRequestBody(resendEmailSchema),
  AuthController.resendVerificationEmail,
);
router.post(
  '/reset-password-request',
  validateRequestBody(resetPasswordRequestSchema),
  AuthController.requestPasswordReset,
);
router.post(
  '/reset-password',
  validateRequestBody(resetPasswordSchema),
  AuthController.resetPassword,
);
router.get('/logout', AuthController.logout);
router.use(checkAuth);
router.get('/profile', AuthController.profile);

export default router;
