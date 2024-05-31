import prisma from '../config/index.js';

class ItemRepository {
  static async createItem(data) {
    return prisma.item.create({ data });
  }

  static async getItem(itemId) {
    return prisma.item.findUnique({ where: { id: itemId } });
  }

  static async getAllItems() {
    return prisma.item.findMany();
  }

  static async updateItem(itemId, data) {
    return prisma.item.update({ where: { id: itemId }, data });
  }

  static async deleteItem(itemId) {
    return prisma.item.delete({ where: { id: itemId } });
  }
}

export default ItemRepository;
