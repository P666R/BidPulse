import asyncHandler from 'express-async-handler';

import NotificationService from '../services/NotificationService.js';

class NotificationController {
  static getNotifications = asyncHandler(async (req, res, next) => {
    const notifications = await NotificationService.getNotifications(
      req.user.id,
    );
    res.status(200).json({
      success: true,
      data: {
        notifications,
      },
    });
  });

  static markAsRead = asyncHandler(async (req, res, next) => {
    await NotificationService.markAsRead(req.params.id);
    res.status(204).send();
  });
}

export default NotificationController;
