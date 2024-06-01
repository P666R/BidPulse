import asyncHandler from 'express-async-handler';
import ItemService from '../services/ItemService.js';
import upload from '../middleware/MulterMiddleware.js';

class ItemController {
  static createItem = [
    upload.single('image'),
    asyncHandler(async (req, res, next) => {
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      req.body = { ...req.body, imageUrl };

      const item = await ItemService.createItem(req.body);
      res.status(201).json({
        success: true,
        data: {
          item,
        },
      });
    }),
  ];

  static getItem = asyncHandler(async (req, res, next) => {
    const item = await ItemService.getItem(req.params.id);
    res.status(200).json({
      success: true,
      data: {
        item,
      },
    });
  });

  static getAllItems = asyncHandler(async (req, res, next) => {
    const items = await ItemService.getAllItems(req.query);
    res.status(200).json({
      success: true,
      data: {
        items,
      },
    });
  });

  static updateItem = asyncHandler(async (req, res, next) => {
    const item = await ItemService.updateItem(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: {
        item,
      },
    });
  });

  static deleteItem = asyncHandler(async (req, res, next) => {
    await ItemService.deleteItem(req.params.id);
    res.status(204).send();
  });
}

export default ItemController;
