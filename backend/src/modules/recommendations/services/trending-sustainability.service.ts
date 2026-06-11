import Product from '../../../models/Product';
import Order from '../../../models/Order';

export class TrendingSustainabilityService {
  /**
   * Identifies trending sustainable products platform-wide.
   */
  static async getTrendingGreenProducts() {
    // 1. Get most frequently purchased items in the last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const trendingAggregation = await Order.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      { $unwind: '$products' },
      { $group: { _id: '$products.product', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 50 }
    ]);

    const trendingIds = trendingAggregation.map(t => t._id);

    // 2. Filter by high eco-score
    const trendingProducts = await Product.find({
      _id: { $in: trendingIds },
      ecoScore: { $gte: 75 }
    }).limit(10);

    return trendingProducts;
  }
}
