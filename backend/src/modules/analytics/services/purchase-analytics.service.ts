import mongoose from 'mongoose';
import Order from '../../../models/Order';

export class PurchaseAnalyticsService {
  /**
   * Returns analytics about a user's macro purchase habits.
   */
  static async getPurchaseAnalytics(userId: string) {
    const data = await Order.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalProductsBought: { $sum: { $size: '$products' } },
          ordersWithGreenDelivery: { $sum: { $cond: ['$sustainableDeliverySelected', 1, 0] } }
        }
      }
    ]);

    const result = data[0] || { totalOrders: 0, totalProductsBought: 0, ordersWithGreenDelivery: 0 };
    const greenRatio = result.totalOrders > 0 
      ? ((result.ordersWithGreenDelivery / result.totalOrders) * 100).toFixed(1) 
      : 0;

    return {
      totalOrders: result.totalOrders,
      totalItemsBought: result.totalProductsBought,
      ordersWithGreenDelivery: result.ordersWithGreenDelivery,
      greenDeliveryPercentage: Number(greenRatio)
    };
  }
}
