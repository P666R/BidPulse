import ItemRepository from '../repository/ItemRepository.js';

class ItemService {
  static async createItem(itemData) {
    return ItemRepository.createItem(itemData);
  }

  static async getItem(itemId) {
    return ItemRepository.getItem(itemId);
  }

  static async getAllItems(queryParams) {
    const { search, status, page, limit } = queryParams;
    return ItemRepository.getAllItems({ search, status, page, limit });
  }

  static async updateItem(itemId, itemData) {
    return ItemRepository.updateItem(itemId, itemData);
  }

  static async deleteItem(itemId) {
    return ItemRepository.deleteItem(itemId);
  }
}

export default ItemService;
