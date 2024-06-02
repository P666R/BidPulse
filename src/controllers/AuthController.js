import asyncHandler from 'express-async-handler';
import AuthService from '../services/AuthService.js';

function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key)),
  );
}

class AuthController {
  static register = asyncHandler(async (req, res) => {
    const result = await AuthService.register(req.body);
    res.status(201).json({ status: 'success', ...result });
  });

  static verify = asyncHandler(async (req, res) => {
    const { emailToken, userId } = req.params;
    await AuthService.verify(emailToken, userId);
    res
      .status(200)
      .json({ status: 'success', message: 'Email verified successfully' });
  });

  static resendVerificationEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const result = await AuthService.resendVerificationEmail(email);
    res.status(200).json({ status: 'success', ...result });
  });

  static requestPasswordReset = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const result = await AuthService.requestPasswordReset(email);
    res.status(200).json({ status: 'success', ...result });
  });

  static resetPassword = asyncHandler(async (req, res) => {
    const { emailToken, userId } = req.query;
    const { password } = req.body;
    const result = await AuthService.resetPassword(
      password,
      userId,
      emailToken,
    );
    res.status(200).json({ status: 'success', ...result });
  });

  static login = asyncHandler(async (req, res) => {
    const { token, user } = await AuthService.login(req.body);
    const userWithoutPassword = exclude(user, ['password', 'createdAt']);
    res
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'none',
      })
      .json({ status: 'success', data: { user: userWithoutPassword } });
  });

  static profile = asyncHandler(async (req, res) => {
    let user = await AuthService.profile(req.user.id);
    user = exclude(user, ['password', 'createdAt']);
    res.status(200).json({ success: true, data: { user } });
  });

  static logout = asyncHandler(async (req, res) => {
    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' });
    res
      .status(200)
      .json({ success: true, message: 'User logged out successfully' });
  });
}

export default AuthController;
