import asyncHandler from 'express-async-handler';
import BidService from '../services/BidService.js';

class BidController {
  static createBid = asyncHandler(async (req, res, next) => {
    const { bidAmount } = req.body;
    const bid = await BidService.createBid(
      req.params.itemId,
      req.user.id,
      bidAmount,
    );
    res.status(201).json({
      success: true,
      data: {
        bid,
      },
    });
  });

  static getAllBids = asyncHandler(async (req, res, next) => {
    const bids = await BidService.getAllBids(req.params.itemId);
    res.status(200).json({
      success: true,
      data: {
        bids,
      },
    });
  });
}

export default BidController;
