import { z } from 'zod';
import express from 'express';
import role from '../middleware/RoleMiddleware.js';
import checkAuth from '../middleware/AuthMiddleware.js';
import ItemController from '../controllers/ItemController.js';
import {
  validateQueryParams,
  validateParams,
  queryItemSchema,
} from '../utils/Validator.js';

const router = express.Router();

router.use(checkAuth);

router
  .route('/')
  .get(validateQueryParams(queryItemSchema), ItemController.getAllItems)
  .post(role.checkRole(role.ROLES.ADMIN), ItemController.createItem);

router
  .route('/:id')
  .get(
    validateParams(z.object({ id: z.string().uuid() })),
    ItemController.getItem,
  )
  .put(
    role.checkRole(role.ROLES.ADMIN),
    validateParams(z.object({ id: z.string().uuid() })),
    ItemController.updateItem,
  )
  .delete(
    role.checkRole(role.ROLES.ADMIN),
    validateParams(z.object({ id: z.string().uuid() })),
    ItemController.deleteItem,
  );

export default router;
