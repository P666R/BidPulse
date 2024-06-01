import { z } from 'zod';
import { systemLogs } from './Logger.js';
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

// Item description validation schema
const itemDescriptionSchema = z
  .string()
  .trim()
  .max(500, { message: 'Description must be at most 500 characters long' });

// Starting price validation schema
const startingPriceSchema = z
  .number()
  .positive({ message: 'Starting price must be a positive number' });

// End time validation schema
const endTimeSchema = z.string().refine(
  (dateString) => {
    const date = new Date(dateString);
    return date > new Date();
  },
  { message: 'End time must be a future date' },
);

// Item validation schema
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
});

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
export const validateRequestBody = (schema) => async (req, res, next) => {
  try {
    await schema.parse(req.body);
    next();
  } catch (error) {
    const errorMessage = error.errors[0].message;
    systemLogs.error(`Invalid request body: ${errorMessage}`);
    res.status(400).json({ success: false, message: errorMessage });
  }
};

// Query parameters validation middleware
export const validateQueryParams = (schema) => async (req, res, next) => {
  try {
    req.query = await schema.parse(req.query);
    next();
  } catch (error) {
    const errorMessage = error.errors[0].message;
    systemLogs.error(`Invalid query parameters: ${errorMessage}`);
    res.status(400).json({ success: false, message: errorMessage });
  }
};
