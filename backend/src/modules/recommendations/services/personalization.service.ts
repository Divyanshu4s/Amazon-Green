import { HybridRecommendationService } from './hybrid-recommendation.service';
import { RecommendationMLService } from './recommendation-ml.service';
import { RecommendationExplanationService } from './recommendation-explanation.service';

export class PersonalizationService {
  /**
   * Generates the personalized user feed.
   */
  static async getPersonalizedFeed(userId: string) {
    // 1. Get Hybrid Scored Candidates
    const hybridFeed = await HybridRecommendationService.generateFeed(userId);

    // 2. Pass through ML DLRM to predict actual clicks
    const mlRankedIds = await RecommendationMLService.predictRankings(userId, hybridFeed);

    // 3. Re-map and attach explanations
    const finalFeed = mlRankedIds.map(mlData => {
      const productObj = hybridFeed.find(p => p._id.toString() === mlData.productId.toString());
      const explanations = RecommendationExplanationService.generateExplanation(productObj, false);

      return {
        product: productObj,
        mlMetrics: {
          clickProbability: mlData.clickProbability,
          purchaseProbability: mlData.purchaseProbability
        },
        explanations
      };
    });

    return finalFeed;
  }
}
