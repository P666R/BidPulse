import BidRepository from '../repository/BidRepository.js';

class BidService {
  static async createBid(itemId, userId, bidAmount) {
    return BidRepository.createBid({ itemId, userId, bidAmount });
  }

  static async getAllBids(itemId) {
    return BidRepository.getAllBids(itemId);
  }
}

export default BidService;
