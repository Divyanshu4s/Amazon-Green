import { ContentRecommendationEngine } from './content-recommendation-engine.service';
import { CollaborativeRecommendationEngine } from './collaborative-recommendation-engine.service';
import { SustainabilityBoostService } from './sustainability-boost.service';
import Product from '../../../models/Product';
import Seller from '../../../models/Seller';

export class HybridRecommendationService {
  /**
   * Orchestrates the 40/30/20/10 Hybrid Recommendation Engine.
   */
  static async generateFeed(userId: string) {
    // 1. Get raw candidates
    // Simulated mock content targets (would normally pull from user.viewedProducts)
    const contentCandidates = await Product.find({ isDeleted: false }).limit(20); 
    const collaborativeCandidateIds = await CollaborativeRecommendationEngine.getCollaborativeMatches(userId, 20);
    const collabCandidates = await Product.find({ _id: { $in: collaborativeCandidateIds } });

    // Combine and deduplicate
    const rawMap = new Map();
    contentCandidates.forEach(p => rawMap.set(p._id.toString(), { product: p, source: 'content', baseScore: 40 }));
    collabCandidates.forEach(p => {
      if (rawMap.has(p._id.toString())) {
        rawMap.get(p._id.toString()).baseScore += 30; // Exists in both, increase score
      } else {
        rawMap.set(p._id.toString(), { product: p, source: 'collaborative', baseScore: 30 });
      }
    });

    const scoredCandidates: any[] = [];

    // 2. Apply Sustainability Boosts
    for (const [id, data] of Array.from(rawMap.entries())) {
      const p = data.product;
      const seller = await Seller.findById(p.seller);
      
      const boostMultiplier = SustainabilityBoostService.applyBoost(p, seller);
      
      // Calculate final internal hybrid score
      // EcoScore makes up 20% weight inherently via the boost
      // Seller makes up 10% weight inherently via the boost
      const finalScore = data.baseScore * boostMultiplier;

      scoredCandidates.push({
        ...p.toObject(),
        hybridScore: Number(finalScore.toFixed(2))
      });
    }

    return scoredCandidates.sort((a, b) => b.hybridScore - a.hybridScore).slice(0, 30);
  }
}
