import RecommendationLog, { RecommendationType } from '../../../models/RecommendationLog';

export class RecommendationTrackingService {
  /**
   * Logs a recommendation interaction.
   */
  static async logInteraction(
    userId: string, 
    productId: string, 
    type: RecommendationType, 
    action: 'view' | 'click' | 'purchase',
    ecoScore: number,
    confidence: number
  ) {
    // Find if a log already exists to update it, or create a new one
    let log = await RecommendationLog.findOne({ user: userId, product: productId, type });

    if (!log) {
      log = new RecommendationLog({
        user: userId,
        product: productId,
        type,
        ecoScoreAtRecommendation: ecoScore,
        confidenceScore: confidence,
        viewed: true
      });
    }

    if (action === 'click') log.clicked = true;
    if (action === 'purchase') log.purchased = true;

    await log.save();
    return log;
  }
}
