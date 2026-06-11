import Product from '../../../models/Product';
import User from '../../../models/User';

export class RecommendationService {
  /**
   * Smart Sustainable Recommendations.
   * In a real system, this would use a collaborative filtering ML model.
   * For now, it mocks logic using user preferences to fetch top EcoScore products.
   */
  static async getPersonalizedRecommendations(userId: string) {
    const user = await User.findById(userId);
    
    // Default recommendations if no user history
    const filter: any = { isDeleted: false, ecoScore: { $gte: 80 } };
    
    // Mock user preference logic
    if (user && user.greenCredits > 500) {
      // High tier user, show them Platinum level green stuff
      filter.ecoScore = { $gte: 90 };
    }

    const recommendations = await Product.find(filter)
      .populate('seller', 'businessName ecoBadge')
      .sort({ ecoScore: -1, createdAt: -1 })
      .limit(10);

    return recommendations;
  }
}
