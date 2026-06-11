import mongoose from 'mongoose';
import Order from '../../../models/Order';

export class EcoAnalyticsService {
  /**
   * Deep dive into the user's EcoScore statistics based on past orders.
   */
  static async getEcoScoreAnalytics(userId: string) {
    const data = await Order.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $unwind: '$products' },
      {
        $lookup: {
          from: 'products',
          localField: 'products.product',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      {
        $group: {
          _id: null,
          avgEcoScore: { $avg: '$products.ecoScoreAtPurchase' },
          maxEcoScore: { $max: '$products.ecoScoreAtPurchase' },
          minEcoScore: { $min: '$products.ecoScoreAtPurchase' },
        }
      }
    ]);

    // Additional query for category-wise distribution
    const categoryDistribution = await Order.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $unwind: '$products' },
      {
        $lookup: {
          from: 'products',
          localField: 'products.product',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      { $unwind: '$productDetails' },
      {
        $group: {
          _id: '$productDetails.category',
          avgScore: { $avg: '$products.ecoScoreAtPurchase' }
        }
      },
      { $sort: { avgScore: -1 } }
    ]);

    return {
      overall: data[0] || { avgEcoScore: 0, maxEcoScore: 0, minEcoScore: 0 },
      categoryDistribution: categoryDistribution.map(c => ({ category: c._id, avgScore: Math.round(c.avgScore) }))
    };
  }
}
