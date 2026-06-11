import { DeliveryType, VehicleType } from '../types';
import { PollutionAwareRoutingService } from './pollution-aware-routing.service';
import { DeliveryCarbonService } from './delivery-carbon.service';
import { RouteScoreEngine } from './route-score-engine.service';

export class GreenDeliveryService {
  /**
   * Evaluates standard vs green delivery options for a given route and cart weight.
   */
  static async evaluateDeliveryOptions(origin: { lat: number; lng: number }, dest: { lat: number; lng: number }, payloadWeightKg: number) {
    // Standard Route (Diesel)
    const standardRoute = await PollutionAwareRoutingService.calculateRoute({ origin, destination: dest, vehicleType: VehicleType.DIESEL_VAN });
    const standardCarbon = DeliveryCarbonService.calculateEmissions(standardRoute.distanceKm, VehicleType.DIESEL_VAN, payloadWeightKg);
    const standardScore = RouteScoreEngine.calculateRouteScore({
      distanceKm: standardRoute.distanceKm,
      trafficCongestionLevel: standardRoute.realTimeFactors.trafficCongestionLevel,
      currentAQI: standardRoute.realTimeFactors.currentAQI,
      carbonEmissionsKg: standardCarbon.co2EmissionsKg,
      vehicleType: VehicleType.DIESEL_VAN
    });

    // Green Route (EV or Bike based on distance/weight)
    const greenVehicle = (standardRoute.distanceKm < 5 && payloadWeightKg < 10) ? VehicleType.BICYCLE : VehicleType.ELECTRIC_VAN;
    
    const greenRoute = await PollutionAwareRoutingService.calculateRoute({ origin, destination: dest, vehicleType: greenVehicle });
    const greenCarbon = DeliveryCarbonService.calculateEmissions(greenRoute.distanceKm, greenVehicle, payloadWeightKg);
    const greenScore = RouteScoreEngine.calculateRouteScore({
      distanceKm: greenRoute.distanceKm,
      trafficCongestionLevel: greenRoute.realTimeFactors.trafficCongestionLevel,
      currentAQI: greenRoute.realTimeFactors.currentAQI,
      carbonEmissionsKg: greenCarbon.co2EmissionsKg,
      vehicleType: greenVehicle
    });

    return {
      recommendedType: DeliveryType.GREEN,
      carbonSavingsEstimate: greenCarbon.carbonSavedKg,
      options: [
        {
          type: DeliveryType.STANDARD,
          vehicle: VehicleType.DIESEL_VAN,
          estimatedMinutes: standardRoute.estimatedTimeMinutes,
          co2EmissionsKg: standardCarbon.co2EmissionsKg,
          routeScore: standardScore
        },
        {
          type: DeliveryType.GREEN,
          vehicle: greenVehicle,
          estimatedMinutes: greenRoute.estimatedTimeMinutes, // Might be slower depending on traffic/bike routes
          co2EmissionsKg: greenCarbon.co2EmissionsKg,
          routeScore: greenScore
        }
      ]
    };
  }
}
