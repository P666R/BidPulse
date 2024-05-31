import prisma from '../config/index.js';

class NotificationRepository {
  static async getNotifications(userId) {
    return prisma.notification.findMany({ where: { userId } });
  }

  static async markAsRead(notificationId) {
    return prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }
}

export default NotificationRepository;
