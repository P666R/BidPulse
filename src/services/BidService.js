import BidRepository from '../repository/BidRepository.js';

class BidService {
  static async createBid(userId, data) {
    return BidRepository.createBid({ ...data, userId });
  }

  static async getBidsByItem(itemId) {
    return BidRepository.getBidsByItem(itemId);
  }
}

export default BidService;
