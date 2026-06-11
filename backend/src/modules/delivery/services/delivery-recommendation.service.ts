import { DeliveryCarbonService } from './delivery-carbon.service';
import { VehicleType } from '../types';

export class DeliveryRecommendationService {
  /**
   * Generates dynamic nudges for the frontend checkout screen.
   */
  static generateNudges(distanceKm: number, isLocalBetter: boolean, localCarbonSavedKg: number) {
    const nudges: string[] = [];

    // Simulate standard Group Delivery savings (approx 1 trip avoided = 3km of driving)
    const groupSavings = DeliveryCarbonService.calculateEmissions(3, VehicleType.DIESEL_VAN, 2).baselineEmissionsKg;
    nudges.push(`Choosing Group Delivery saves approx ${groupSavings.toFixed(1)}kg CO₂.`);

    if (isLocalBetter && localCarbonSavedKg > 0) {
      nudges.push(`Choosing this Local Seller reduces emissions by ${localCarbonSavedKg.toFixed(1)}kg CO₂.`);
    }

    if (distanceKm < 5) {
      nudges.push(`Switching to Green Delivery (Bicycle) earns 20 Sapling Coins!`);
    }

    return nudges;
  }
}
