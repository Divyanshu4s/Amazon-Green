import User from '../../../models/User';
import Seller from '../../../models/Seller';

export class LeaderboardAnalyticsService {
  /**
   * Fetches top rankings for various macro metrics.
   */
  static async getTopRankings(limit = 5) {
    const [topSavers, topPlanters, topSellers] = await Promise.all([
      User.find({ role: 'customer' })
        .select('name carbonSaved ecoLevel badges')
        .sort({ carbonSaved: -1 })
        .limit(limit),
      
      User.find({ role: 'customer' })
        .select('name treesPlanted ecoLevel badges')
        .sort({ treesPlanted: -1 })
        .limit(limit),

      Seller.find()
        .populate('user', 'name profileImage')
        .select('businessName sustainabilityScore ecoBadge verificationStatus')
        .sort({ sustainabilityScore: -1 })
        .limit(limit)
    ]);

    return {
      topCarbonSavers: topSavers,
      topTreePlanters: topPlanters,
      topSustainableSellers: topSellers
    };
  }
}
