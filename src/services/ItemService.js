import ItemRepository from '../repository/ItemRepository.js';

class ItemService {
  static async createItem(data) {
    return ItemRepository.createItem(data);
  }

  static async getItem(itemId) {
    return ItemRepository.getItem(itemId);
  }

  static async getAllItems() {
    return ItemRepository.getAllItems();
  }

  static async updateItem(itemId, data) {
    return ItemRepository.updateItem(itemId, data);
  }

  static async deleteItem(itemId) {
    return ItemRepository.deleteItem(itemId);
  }
}

export default ItemService;
