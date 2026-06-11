import Product from '../../../models/Product';
import Seller from '../../../models/Seller';

export class SustainabilityRadiusService {
  /**
   * Finds eco-friendly products available within a specific distance from the customer.
   * Leverages MongoDB $near and 2dsphere indexes.
   */
  static async findNearbyEcoProducts(lat: number, lng: number, maxDistanceKm: number) {
    const maxDistanceMeters = maxDistanceKm * 1000;

    const nearbyProducts = await Product.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: maxDistanceMeters
        }
      },
      ecoScore: { $gte: 75 }, // Only sustainable products
      isDeleted: false
    })
    .populate('seller', 'businessName sustainabilityScore')
    .limit(20);

    return nearbyProducts;
  }

  /**
   * Finds the greenest sellers nearby.
   */
  static async findNearbyGreenSellers(lat: number, lng: number, maxDistanceKm: number) {
     const maxDistanceMeters = maxDistanceKm * 1000;
     const nearbySellers = await Seller.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: maxDistanceMeters
        }
      },
      sustainabilityScore: { $gte: 80 }
    }).limit(10);

    return nearbySellers;
  }
}
