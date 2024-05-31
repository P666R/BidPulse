import express from 'express';
import NotificationController from '../controllers/NotificationController.js';
import authenticateUser from '../middleware/AuthMiddleware.js';

const router = express.Router();

router.use(authenticateUser);

router.get('/', NotificationController.getNotifications);
router.patch('/:id/read', NotificationController.markAsRead);

export default router;
