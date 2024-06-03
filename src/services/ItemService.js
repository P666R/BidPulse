import ItemRepository from '../repository/ItemRepository.js';
import AppError from '../helpers/AppError.js';

class ItemService {
  static async createItem(itemData) {
    return ItemRepository.createItem(itemData);
  }

  static async getItem(itemId) {
    const item = await ItemRepository.getItem(itemId);
    if (!item) {
      throw new AppError('Item not found', 404);
    }
    return item;
  }

  static async getAllItems(queryParams) {
    return ItemRepository.getAllItems(queryParams);
  }

  static async updateItem(itemId, user, itemData) {
    const item = await ItemRepository.updateItem(itemId, itemData);
    if (!item) {
      throw new AppError('Item not found', 404);
    }

    if (user.role !== 'admin' || item.owner !== user.id) {
      throw new AppError('You are not authorized to update this item', 403);
    }

    return item;
  }

  static async deleteItem(itemId, user) {
    const item = await ItemRepository.deleteItem(itemId);

    if (user.role !== 'admin' || item.owner !== user.id) {
      throw new AppError('You are not authorized to delete this item', 403);
    }

    if (!item) {
      throw new AppError('Item not found', 404);
    }
  }
}

export default ItemService;
