import { VehicleType } from '../types';

export class DeliveryCarbonService {
  /**
   * Emission factors in kg CO2 per km for different vehicle types.
   * Source: Assumed averages for urban delivery
   */
  private static EMISSION_FACTORS = {
    [VehicleType.BICYCLE]: 0.0,
    [VehicleType.ELECTRIC_VAN]: 0.05, // Grid electricity generation factor
    [VehicleType.HYBRID_VAN]: 0.15,
    [VehicleType.DIESEL_VAN]: 0.25,
    [VehicleType.HEAVY_TRUCK]: 0.60,
  };

  /**
   * Calculates estimated carbon emissions for a specific route and vehicle.
   */
  static calculateEmissions(distanceKm: number, vehicleType: VehicleType, payloadWeightKg: number) {
    const baseEmissionFactor = this.EMISSION_FACTORS[vehicleType];
    
    // Payload modifier: Heavier payloads slightly decrease fuel efficiency
    // Rough heuristic: +1% emissions per 100kg of payload
    const weightPenalty = 1 + ((payloadWeightKg / 100) * 0.01);
    
    const actualEmissions = distanceKm * baseEmissionFactor * weightPenalty;
    
    // Calculate baseline against the worst-case scenario (Diesel Van)
    const baselineEmissions = distanceKm * this.EMISSION_FACTORS[VehicleType.DIESEL_VAN] * weightPenalty;
    const savings = Math.max(0, baselineEmissions - actualEmissions);

    return {
      co2EmissionsKg: Number(actualEmissions.toFixed(3)),
      baselineEmissionsKg: Number(baselineEmissions.toFixed(3)),
      carbonSavedKg: Number(savings.toFixed(3)),
    };
  }
}
