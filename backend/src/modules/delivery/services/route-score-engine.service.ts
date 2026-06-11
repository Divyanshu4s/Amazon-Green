import { VehicleType } from '../types';

export class RouteScoreEngine {
  /**
   * Calculates a 0-100 score for a route. Higher is more sustainable.
   */
  static calculateRouteScore(params: {
    distanceKm: number;
    trafficCongestionLevel: number;
    currentAQI: number;
    carbonEmissionsKg: number;
    vehicleType: VehicleType;
  }) {
    let score = 100;

    // 1. Vehicle Penalty (Max 40 points lost)
    if (params.vehicleType === VehicleType.DIESEL_VAN) score -= 40;
    else if (params.vehicleType === VehicleType.HEAVY_TRUCK) score -= 50; // Cap at bottom
    else if (params.vehicleType === VehicleType.HYBRID_VAN) score -= 15;
    else if (params.vehicleType === VehicleType.ELECTRIC_VAN) score -= 5;
    // Bicycles lose 0 points here

    // 2. Traffic Penalty (Max 20 points lost)
    // Idling in traffic increases local pollution exposure
    const trafficPenalty = (params.trafficCongestionLevel / 100) * 20;
    score -= trafficPenalty;

    // 3. AQI Penalty (Max 20 points lost)
    // If AQI is high (bad air), adding diesel emissions is severely penalized
    if (params.vehicleType === VehicleType.DIESEL_VAN || params.vehicleType === VehicleType.HEAVY_TRUCK) {
      if (params.currentAQI > 100) {
        score -= 20; // Unhealthy
      } else if (params.currentAQI > 50) {
        score -= 10; // Moderate
      }
    }

    // 4. Distance Efficiency Penalty (Max 20 points lost)
    // Routes over 50km are inherently less sustainable for local delivery
    if (params.distanceKm > 50) score -= 20;
    else if (params.distanceKm > 20) score -= 10;

    return Math.max(0, Math.round(score));
  }
}
