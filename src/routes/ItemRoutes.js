import express from 'express';
import ItemController from '../controllers/ItemController.js';
import authenticateUser from '../middleware/AuthMiddleware.js';
import role from '../middleware/RoleMiddleware.js';

const router = express.Router();

router.use(authenticateUser, role.checkRole(role.ROLES.ADMIN));

router
  .route('/')
  .get(ItemController.getAllItems)
  .post(ItemController.createItem);

router
  .route('/:id')
  .get(ItemController.getItem)
  .put(ItemController.updateItem)
  .delete(ItemController.deleteItem);

export default router;
