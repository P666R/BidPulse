import asyncHandler from 'express-async-handler';
import AppError from '../helpers/AppError.js';
import { systemLogs } from '../utils/Logger.js';
import { itemSchema, updateItemSchema } from '../utils/Validator.js';
import ItemService from '../services/ItemService.js';
import upload from '../middleware/MulterMiddleware.js';

class ItemController {
  static createItem = [
    upload.single('image'),
    asyncHandler(async (req, res, next) => {
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
      const formData = imageUrl
        ? { ...req.body, owner: req.user.id, imageUrl }
        : { ...req.body, owner: req.user.id };

      const validationResult = itemSchema.safeParse(formData);
      if (!validationResult.success) {
        const errorDetails = validationResult.error.errors
          .map((err) => err.message)
          .join(', ');
        systemLogs.error(`Invalid query parameters: ${errorDetails}`);
        return next(
          new AppError(`Invalid query parameters: ${errorDetails}`, 400),
        );
      }

      const item = await ItemService.createItem(validationResult.data);
      res.status(201).json({
        status: 'success',
        data: { item },
      });
    }),
  ];

  static getItem = asyncHandler(async (req, res, next) => {
    const item = await ItemService.getItem(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { item },
    });
  });

  static getAllItems = asyncHandler(async (req, res, next) => {
    const items = await ItemService.getAllItems(req.query);
    res.status(200).json({
      status: 'success',
      data: { items },
    });
  });

  static updateItem = [
    upload.single('image'),
    asyncHandler(async (req, res, next) => {
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
      const formData = imageUrl ? { ...req.body, imageUrl } : req.body;

      const validationResult = updateItemSchema.safeParse(formData);
      if (!validationResult.success) {
        const errorDetails = validationResult.error.errors
          .map((err) => err.message)
          .join(', ');
        throw new AppError(`Invalid request body: ${errorDetails}`, 400);
      }

      const item = await ItemService.updateItem(
        req.params.id,
        req.user,
        validationResult.data,
      );
      res.status(200).json({
        status: 'success',
        data: { item },
      });
    }),
  ];

  static deleteItem = asyncHandler(async (req, res, next) => {
    await ItemService.deleteItem(req.params.id, req.user);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
}

export default ItemController;
