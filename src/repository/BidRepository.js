import prisma from '../config/index.js';

class BidRepository {
  static async createBid(data) {
    return prisma.bid.create({ data });
  }

  static async getAllBids(itemId) {
    return prisma.bid.findMany({ where: { itemId } });
  }
}

export default BidRepository;
