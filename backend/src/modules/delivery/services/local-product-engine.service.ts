import { PollutionAwareRoutingService } from './pollution-aware-routing.service';
import { VehicleType } from '../types';

export class LocalProductEngine {
  /**
   * Calculates the sustainability boost for choosing a local product vs a remote one.
   */
  static async evaluateLocalBoost(customerLoc: {lat: number; lng: number}, localWarehouse: {lat: number; lng: number}, remoteWarehouse: {lat: number; lng: number}) {
    // We only care about distance here
    const localRoute = await PollutionAwareRoutingService.calculateRoute({ origin: localWarehouse, destination: customerLoc, vehicleType: VehicleType.DIESEL_VAN });
    const remoteRoute = await PollutionAwareRoutingService.calculateRoute({ origin: remoteWarehouse, destination: customerLoc, vehicleType: VehicleType.HEAVY_TRUCK });

    // Roughly estimate CO2 just based on distance (assuming heavy truck for long haul)
    // Heavy Truck ~0.6kg/km, Local Van ~0.25kg/km
    const localCO2 = localRoute.distanceKm * 0.25;
    const remoteCO2 = remoteRoute.distanceKm * 0.6;

    const savedCO2 = remoteCO2 - localCO2;
    const reductionPercent = (savedCO2 / remoteCO2) * 100;

    return {
      isLocalSignificantlyBetter: reductionPercent > 20,
      carbonReductionPotentialKg: Number(savedCO2.toFixed(2)),
      reductionPercentage: Math.min(100, Math.round(reductionPercent)),
      localDistanceKm: localRoute.distanceKm,
    };
  }
}
