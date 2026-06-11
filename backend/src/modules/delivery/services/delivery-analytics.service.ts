import mongoose from 'mongoose';
import Order from '../../../models/Order';
import GroupDelivery from '../../../models/GroupDelivery';

export class DeliveryAnalyticsService {
  /**
   * User-level delivery impact analytics.
   */
  static async getUserDeliveryImpact(userId: string) {
    const orders = await Order.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalDeliveries: { $sum: 1 },
          greenDeliveries: { $sum: { $cond: ['$sustainableDeliverySelected', 1, 0] } },
          groupDeliveries: { $sum: { $cond: ['$groupDeliverySelected', 1, 0] } },
          // Proxy for local deliveries based on distance or flags if available
        }
      }
    ]);

    const groups = await GroupDelivery.aggregate([
      { $match: { participants: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalTripsAvoided: { $sum: 1 }, // Contributed to 1 trip avoidance per group
        }
      }
    ]);

    const oStats = orders[0] || { totalDeliveries: 0, greenDeliveries: 0, groupDeliveries: 0 };
    const gStats = groups[0] || { totalTripsAvoided: 0 };

    return {
      totalDeliveries: oStats.totalDeliveries,
      greenDeliveries: oStats.greenDeliveries,
      groupDeliveries: oStats.groupDeliveries,
      tripsAvoided: gStats.totalTripsAvoided,
      carbonSavedKg: 0, // This should pull from User model's aggregated stats in a real app
    };
  }
}
