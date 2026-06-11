import Seller, { EcoBadge } from '../../../models/Seller';

export class SellerBadgeService {
  /**
   * Automatically determines the badge based on the final EcoScore.
   */
  static determineBadge(finalScore: number): EcoBadge {
    if (finalScore >= 95) return EcoBadge.CLIMATE_CHAMPION;
    if (finalScore >= 85) return EcoBadge.ECO_INNOVATION_AWARD;
    if (finalScore >= 75) return EcoBadge.PACKAGING_CHAMPION;
    if (finalScore >= 60) return EcoBadge.LOCAL_SUSTAINABILITY_LEADER;
    if (finalScore >= 50) return EcoBadge.VERIFIED_GREEN_SELLER;
    
    return EcoBadge.NONE;
  }

  static async awardBadge(sellerId: string, finalScore: number) {
    const badge = this.determineBadge(finalScore);
    
    await Seller.findByIdAndUpdate(sellerId, { 
      ecoBadge: badge,
      sustainabilityScore: finalScore
    });

    return badge;
  }
}
