import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import prisma from '../config/index.js';
import AppError from '../helpers/AppError.js';

const checkAuth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('No token provided', 401));
  }

  const jwtToken = authHeader.split(' ')[1];

  try {
    const decoded = await jwt.verify(
      jwtToken,
      process.env.JWT_ACCESS_SECRET_KEY,
    );
    const userId = decoded.id;

    req.user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!req.user) {
      return next(new AppError('User not found', 404));
    }

    next();
  } catch (err) {
    return next(new AppError('Invalid token', 403));
  }
});

export default checkAuth;
