import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;

  if (err instanceof PrismaClientKnownRequestError) {
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || err.errors[0].message || 'Internal Server Error',
    statusCode,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
