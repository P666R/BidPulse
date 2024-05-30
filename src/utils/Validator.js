import { z } from 'zod';
import { systemLogs } from './Logger.js';

const usernameSchema = z
  .string()
  .trim()
  .min(3, { message: 'Username must be at least 3 characters long' })
  .max(30, { message: 'Username must be at most 30 characters long' })
  .regex(/^[a-zA-Z0-9_-]+$/, {
    message:
      'Username can only contain alphanumeric characters, underscores, and hyphens',
  });

const emailSchema = z
  .string()
  .trim()
  .email({ message: 'Invalid email address' });

const passwordSchema = z
  .string()
  .trim()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  });

const itemDescriptionSchema = z
  .string()
  .trim()
  .max(500, { message: 'Description must be at most 500 characters long' });

const startingPriceSchema = z
  .number()
  .positive({ message: 'Starting price must be a positive number' });

const endTimeSchema = z.string().refine(
  (dateString) => {
    const date = new Date(dateString);
    return date > new Date();
  },
  { message: 'End time must be a future date' },
);

export const registerSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const itemSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .max(255, { message: 'Name must be at most 255 characters long' }),
  description: itemDescriptionSchema,
  startingPrice: startingPriceSchema,
  endTime: endTimeSchema,
});

export const bidSchema = z.object({
  bidAmount: z
    .number()
    .positive({ message: 'Bid amount must be a positive number' }),
});

export const validateRequestBody = (schema) => async (req, res, next) => {
  try {
    await schema.parse(req.body);
    next();
  } catch (error) {
    const errorMessage = error.errors[0].message;
    systemLogs.error(`Invalid request body: ${errorMessage}`);
    res.status(400);
    next(error);
  }
};
