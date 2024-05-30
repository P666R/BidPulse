import asyncHandler from 'express-async-handler';
import AuthService from '../services/AuthService.js';

function exclude(user, keys) {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key)),
  );
}

class AuthController {
  static registerUser = asyncHandler(async (req, res, next) => {
    let user = await AuthService.register(req.body);
    user = exclude(user, ['password', 'createdAt']);

    res.status(201).json({
      success: true,
      data: {
        user,
      },
    });
  });

  static loginUser = asyncHandler(async (req, res, next) => {
    const { token, user } = await AuthService.login(req.body);
    const userWithoutPassword = exclude(user, ['password', 'createdAt']);

    res
      .cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'none',
      })
      .json({
        success: true,
        data: {
          user: userWithoutPassword,
        },
      });
  });

  static getProfile = asyncHandler(async (req, res, next) => {
    let user = await AuthService.getProfile(req.user.id);
    user = exclude(user, ['password', 'createdAt']);

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  });

  static logoutUser = asyncHandler(async (req, res, next) => {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.status(200).json({
      success: true,
      message: 'User logged out successfully',
    });
  });
}

export default AuthController;
