import { promisify } from 'util';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import prisma from '../config/index.js';

const verifyToken = promisify(jwt.verify);

const authenticateUser = asyncHandler(async (req, res, next) => {
  let jwtToken;

  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401);
    throw new Error('No token provided');
  }

  if (authHeader && authHeader.startsWith('Bearer ')) {
    jwtToken = authHeader.split(' ')[1];
  }

  try {
    const decoded = await verifyToken(
      jwtToken,
      process.env.JWT_ACCESS_SECRET_KEY,
    );

    const userId = decoded.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(401);
      throw new Error('Unauthorized user');
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(403);
    throw new Error('Invalid token');
  }
});

export default authenticateUser;
