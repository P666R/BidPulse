import asyncHandler from 'express-async-handler';
import ItemService from '../services/ItemService.js';

class ItemController {
  static createItem = asyncHandler(async (req, res, next) => {
    const item = await ItemService.createItem(req.body);
    res.status(201).json({
      success: true,
      data: {
        item,
      },
    });
  });

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
    const items = await ItemService.getAllItems();
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
