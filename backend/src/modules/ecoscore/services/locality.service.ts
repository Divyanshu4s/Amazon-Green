import { CalculateEcoScoreDto } from '../dtos/calculate-score.dto';

export class LocalityScoreService {
  /**
   * Evaluates Locality Score (5% weight)
   * Uses simple Haversine distance estimation between customer and seller/warehouse.
   */
  static calculate(dto: CalculateEcoScoreDto): { score: number; explanations: string[] } {
    let score = 0;
    const explanations: string[] = [];

    const origin = dto.warehouseLocation || dto.sellerLocation;
    const dest = dto.customerLocation;

    // Simple Haversine distance in km
    const distanceKm = this.getDistanceFromLatLonInKm(origin.lat, origin.lng, dest.lat, dest.lng);

    if (distanceKm <= 50) {
      score = 100;
      explanations.push(`Score increased for extremely local sourcing (Distance: ~${Math.round(distanceKm)}km).`);
    } else if (distanceKm <= 200) {
      score = 85;
      explanations.push(`Score increased for regional sourcing (Distance: ~${Math.round(distanceKm)}km).`);
    } else if (distanceKm <= 500) {
      score = 70;
      explanations.push(`Moderate locality score for cross-region shipping (Distance: ~${Math.round(distanceKm)}km).`);
    } else if (distanceKm <= 1000) {
      score = 50;
      explanations.push(`Score reduced due to long-distance domestic shipping (Distance: ~${Math.round(distanceKm)}km).`);
    } else {
      score = 30;
      explanations.push(`Score significantly reduced due to international/long-haul shipping (Distance: ~${Math.round(distanceKm)}km).`);
    }

    return { score, explanations };
  }

  private static getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private static deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
}
