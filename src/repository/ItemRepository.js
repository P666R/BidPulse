import prisma from '../config/index.js';
import { PAGINATION } from '../constants/index.js';

class ItemRepository {
  static async createItem(itemData) {
    itemData.currentPrice = itemData.startingPrice;
    return prisma.item.create({ data: itemData });
  }

  static async getItem(itemId) {
    return prisma.item.findUnique({ where: { id: itemId } });
  }

  static async getAllItems({
    search,
    status,
    page = PAGINATION.PAGE,
    limit = PAGINATION.LIMIT,
  }) {
    const where = {};

    if (search) {
      where.name = { contains: search };
    }

    if (status) {
      where.status = status;
    }

    return prisma.item.findMany({
      where,
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  static async updateItem(itemId, data) {
    return prisma.item.update({ where: { id: itemId }, data });
  }

  static async deleteItem(itemId) {
    return prisma.item.delete({ where: { id: itemId } });
  }
}

export default ItemRepository;
