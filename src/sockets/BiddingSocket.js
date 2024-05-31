import BidService from '../services/BidService.js';
import ItemService from '../services/ItemService.js';

const BiddingSocket = (io, socket) => {
  socket.on('place_bid', async (data) => {
    const { userId, itemId, bidAmount } = data;
    try {
      const newBid = await BidService.createBid(userId, { itemId, bidAmount });
      const updatedItem = await ItemService.updateItem(itemId, {
        current_price: bidAmount,
      });
      io.emit('new_bid', { newBid, updatedItem });
      socket.emit('bid_success', {
        message: 'Your bid has been placed successfully.',
      });
    } catch (error) {
      socket.emit('bid_error', {
        message: 'Error placing bid.',
        error: error.message,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
};

export default BiddingSocket;
