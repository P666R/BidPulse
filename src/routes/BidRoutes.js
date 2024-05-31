import express from 'express';
import BidController from '../controllers/BidController.js';
import authenticateUser from '../middleware/AuthMiddleware.js';
import role from '../middleware/RoleMiddleware.js';

const router = express.Router();

router.use(authenticateUser, role.checkRole(role.ROLES.USER));

router.post('/', BidController.createBid);
router.get('/item/:itemId', BidController.getBidsByItem);

export default router;
