import Order from '../../../models/Order';
import User from '../../../models/User';
import mongoose from 'mongoose';

export class CollaborativeRecommendationEngine {
  /**
   * Identifies products bought by similar users (User-Item Collaborative Filtering heuristic).
   */
  static async getCollaborativeMatches(userId: string, limit = 10) {
    const user = await User.findById(userId);
    if (!user) return [];

    // Find users with the same category preferences
    const similarUsers = await User.find({
      _id: { $ne: user._id },
      categoryPreferences: { $in: user.categoryPreferences || [] }
    }).limit(50).select('_id');

    const similarUserIds = similarUsers.map(u => u._id);

    // Find products those users bought
    const recommendedProductsAggregation = await Order.aggregate([
      { $match: { user: { $in: similarUserIds } } },
      { $unwind: '$products' },
      { $group: { _id: '$products.product', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit }
    ]);

    const productIds = recommendedProductsAggregation.map(p => p._id);

    // In a real scenario, we'd populate the Product details here
    return productIds;
  }
}
