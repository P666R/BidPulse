import { z } from 'zod';
import express from 'express';
import role from '../middleware/RoleMiddleware.js';
import checkAuth from '../middleware/AuthMiddleware.js';
import BidController from '../controllers/BidController.js';
import ItemController from '../controllers/ItemController.js';
import {
  validateQueryParams,
  validateParams,
  queryItemSchema,
} from '../utils/Validator.js';

const router = express.Router();

router
  .route('/')
  .get(validateQueryParams(queryItemSchema), ItemController.getAllItems)
  .post(checkAuth, ItemController.createItem);

router
  .route('/:id')
  .get(
    validateParams(z.object({ id: z.string().uuid() })),
    ItemController.getItem,
  )
  .put(
    checkAuth,
    role.checkRole(role.ROLES.ADMIN, role.ROLES.USER),
    validateParams(z.object({ id: z.string().uuid() })),
    ItemController.updateItem,
  )
  .delete(
    checkAuth,
    role.checkRole(role.ROLES.ADMIN, role.ROLES.USER),
    validateParams(z.object({ id: z.string().uuid() })),
    ItemController.deleteItem,
  );

router
  .route('/:itemId/bids')
  .get(BidController.getAllBids)
  .post(checkAuth, BidController.createBid);

export default router;
