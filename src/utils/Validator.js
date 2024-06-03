import { z } from 'zod';
import asyncHandler from 'express-async-handler';
import { systemLogs } from './Logger.js';
import AppError from '../helpers/AppError.js';
import { PAGINATION } from '../constants/index.js';

// Username validation schema
const usernameSchema = z
  .string()
  .trim()
  .min(3, { message: 'Username must be at least 3 characters long' })
  .max(30, { message: 'Username must be at most 30 characters long' })
  .regex(/^[a-zA-Z0-9_-]+$/, {
    message:
      'Username can only contain alphanumeric characters, underscores, and hyphens',
  });

// Email validation schema
const emailSchema = z
  .string()
  .trim()
  .email({ message: 'Invalid email address' });

// Password validation schema
const passwordSchema = z
  .string()
  .trim()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  });

// Registration validation schema
export const registerSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

// Login validation schema
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Resend verification email schema
export const resendEmailSchema = z.object({
  email: emailSchema,
});

// Reset password request schema
export const resetPasswordRequestSchema = z.object({
  email: emailSchema,
});

// Reset password schema
export const resetPasswordSchema = z.object({
  password: passwordSchema,
  // emailToken: z.string().min(1, { message: 'Email token is required' }),
  // userId: z.string().min(1, { message: 'User ID is required' }),
});

// Verify email schema
export const verifyEmailSchema = z.object({
  emailToken: z.string().min(1, { message: 'Email token is required' }),
  userId: z.string().min(1, { message: 'User ID is required' }),
});

// Item description validation schema
const itemDescriptionSchema = z
  .string()
  .trim()
  .max(500, { message: 'Description must be at most 500 characters long' });

// Starting price validation schema
const startingPriceSchema = z
  .string()
  .transform((val) => parseFloat(val))
  .refine((val) => val > 0, {
    message: 'Starting price must be a positive number',
  });

// End time validation schema
const endTimeSchema = z
  .string()
  .transform((val) => new Date(val))
  .refine((date) => date > new Date(), {
    message: 'End time must be a future date',
  })
  .transform((date) => date.toISOString());

// Item create validation schema
export const itemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .max(255, { message: 'Name must be at most 255 characters long' }),
  description: itemDescriptionSchema,
  startingPrice: startingPriceSchema,
  currentPrice: startingPriceSchema.optional(),
  endTime: endTimeSchema,
  imageUrl: z.string().optional(),
  owner: z.string().optional(),
});

// Item update validation schema
export const updateItemSchema = itemSchema.partial();

// Items query parameters validation schema
export const queryItemSchema = z.object({
  search: z.string().trim().optional(),
  status: z
    .enum(['active', 'ended'], {
      message: 'Status must be active or ended',
    })
    .optional(),
  page: z
    .string()
    .regex(/^\d+$/, { message: 'Page must be a number' })
    .transform((val) => (val ? parseInt(val, 10) : PAGINATION.PAGE))
    .optional(),
  limit: z
    .string()
    .regex(/^\d+$/, { message: 'Limit must be a number' })
    .transform((val) => (val ? parseInt(val, 10) : PAGINATION.LIMIT))
    .optional(),
});

// Bid validation schema
export const bidSchema = z.object({
  bidAmount: z
    .number()
    .positive({ message: 'Bid amount must be a positive number' }),
});

// Request body validation middleware
export const validateRequestBody = (schema) =>
  asyncHandler(async (req, res, next) => {
    const validationResult = schema.safeParse(req.body);
    if (!validationResult.success) {
      const errorDetails = validationResult.error.errors
        .map((err) => err.message)
        .join(', ');
      systemLogs.error(`Invalid request body: ${errorDetails}`);
      return next(new AppError(`Invalid request body: ${errorDetails}`, 400));
    }
    req.body = validationResult.data;
    next();
  });

// Query parameters validation middleware
export const validateQueryParams = (schema) =>
  asyncHandler(async (req, res, next) => {
    const validationResult = schema.safeParse(req.query);
    if (!validationResult.success) {
      const errorDetails = validationResult.error.errors
        .map((err) => err.message)
        .join(', ');
      systemLogs.error(`Invalid query parameters: ${errorDetails}`);
      return next(
        new AppError(`Invalid query parameters: ${errorDetails}`, 400),
      );
    }
    req.query = validationResult.data;
    next();
  });

// URL parameters validation middleware
export const validateParams = (schema) =>
  asyncHandler(async (req, res, next) => {
    const validationResult = schema.safeParse(req.params);
    if (!validationResult.success) {
      const errorDetails = validationResult.error.errors
        .map((err) => err.message)
        .join(', ');
      systemLogs.error(`Invalid URL parameters: ${errorDetails}`);
      return next(new AppError(`Invalid URL parameters: ${errorDetails}`, 400));
    }
    req.params = validationResult.data;
    next();
  });
