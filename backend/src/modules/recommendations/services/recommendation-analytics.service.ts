import RecommendationLog from '../../../models/RecommendationLog';

export class RecommendationAnalyticsService {
  /**
   * Tracks the effectiveness and environmental impact of the recommendation engine.
   */
  static async getEngineMetrics() {
    const totalViews = await RecommendationLog.countDocuments({ viewed: true });
    const totalClicks = await RecommendationLog.countDocuments({ clicked: true });
    const totalPurchases = await RecommendationLog.countDocuments({ purchased: true });

    const ctr = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0;
    const conversionRate = totalClicks > 0 ? (totalPurchases / totalClicks) * 100 : 0;

    // Calculate total carbon savings purely driven by recommendations
    const savingsAgg = await RecommendationLog.aggregate([
      { $match: { purchased: true } },
      { $group: { _id: null, totalCarbonSaved: { $sum: '$carbonSavedIfPurchasedKg' } } }
    ]);
    const carbonSavedGenerated = savingsAgg[0]?.totalCarbonSaved || 0;

    return {
      ctr: Number(ctr.toFixed(2)),
      conversionRate: Number(conversionRate.toFixed(2)),
      totalRecommendationsShown: totalViews,
      carbonSavingsGeneratedKg: Number(carbonSavedGenerated.toFixed(2))
    };
  }
}
