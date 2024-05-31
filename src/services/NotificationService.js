import NotificationRepository from '../repository/NotificationRepository.js';

class NotificationService {
  static async getNotifications(userId) {
    return NotificationRepository.getNotifications(userId);
  }

  static async markAsRead(notificationId) {
    return NotificationRepository.markAsRead(notificationId);
  }
}

export default NotificationService;
