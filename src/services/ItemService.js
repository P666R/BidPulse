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

  static async updateItem(itemId, itemData) {
    const item = await ItemRepository.updateItem(itemId, itemData);
    if (!item) {
      throw new AppError('Item not found', 404);
    }
    return item;
  }

  static async deleteItem(itemId) {
    const item = await ItemRepository.deleteItem(itemId);
    if (!item) {
      throw new AppError('Item not found', 404);
    }
  }
}

export default ItemService;
