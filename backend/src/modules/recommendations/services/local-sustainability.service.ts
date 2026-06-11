import Product from '../../../models/Product';
import { RecommendationExplanationService } from './recommendation-explanation.service';

export class LocalSustainabilityService {
  /**
   * Finds local sustainable products near the user.
   */
  static async getLocalProducts(lat: number, lng: number, maxDistanceKm = 20) {
    const maxDistanceMeters = maxDistanceKm * 1000;

    const nearbyProducts = await Product.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: maxDistanceMeters
        }
      },
      ecoScore: { $gte: 60 },
      isDeleted: false
    })
    .populate('seller', 'businessName verificationStatus sustainabilityScore')
    .limit(15);

    return nearbyProducts.map(p => {
      // Simulated carbon savings purely based on it being local vs shipping across country
      const simulatedCarbonSaved = 2.4; 
      const explanations = RecommendationExplanationService.generateExplanation(p, true, simulatedCarbonSaved);
      
      return {
        product: p,
        explanations
      };
    });
  }
}
