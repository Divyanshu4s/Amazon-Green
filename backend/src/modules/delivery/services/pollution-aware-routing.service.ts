import { VehicleType } from '../types';
import { AppError } from '../../../utils/AppError';

export interface RouteParams {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  vehicleType: VehicleType;
}

export class PollutionAwareRoutingService {
  /**
   * Mocks a call to a routing API (like Google Maps) that also factors in
   * current Traffic Congestion and Air Quality Index (AQI).
   */
  static async calculateRoute(params: RouteParams) {
    // 1. Mock the base distance calculation using Haversine formula
    const distanceKm = this.calculateHaversine(params.origin, params.destination);
    
    if (distanceKm > 1000) {
      throw new AppError('Destination is too far for local routing', 400);
    }

    // 2. Mock external real-time data APIs
    const trafficCongestionLevel = this.mockTrafficCongestion(); // 0-100 (100 = gridlock)
    const currentAQI = this.mockAirQualityIndex(); // 0-500

    // 3. Calculate time based on traffic
    // Assuming base speed of 40 km/h
    const baseTimeHours = distanceKm / 40;
    const delayMultiplier = 1 + (trafficCongestionLevel / 100); 
    const estimatedTimeMinutes = Math.round((baseTimeHours * delayMultiplier) * 60);

    return {
      distanceKm: Number(distanceKm.toFixed(2)),
      estimatedTimeMinutes,
      realTimeFactors: {
        trafficCongestionLevel,
        currentAQI,
      },
      routePolyline: "mock_polyline_string_for_frontend_map"
    };
  }

  // --- Mocks ---
  private static calculateHaversine(origin: { lat: number; lng: number }, dest: { lat: number; lng: number }) {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(dest.lat - origin.lat);
    const dLng = toRad(dest.lng - origin.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(origin.lat)) * Math.cos(toRad(dest.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private static mockTrafficCongestion() {
    return Math.floor(Math.random() * 80); // Random traffic 0-80%
  }

  private static mockAirQualityIndex() {
    // Random AQI between 20 (Good) and 150 (Unhealthy)
    return Math.floor(Math.random() * 130) + 20;
  }
}
