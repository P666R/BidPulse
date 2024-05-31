import asyncHandler from 'express-async-handler';
import BidService from '../services/BidService.js';

class BidController {
  static createBid = asyncHandler(async (req, res, next) => {
    const bid = await BidService.createBid(req.user.id, req.body);
    res.status(201).json({
      success: true,
      data: {
        bid,
      },
    });
  });

  static getBidsByItem = asyncHandler(async (req, res, next) => {
    const bids = await BidService.getBidsByItem(req.params.itemId);
    res.status(200).json({
      success: true,
      data: {
        bids,
      },
    });
  });
}

export default BidController;
