import mongoose from 'mongoose';
import Order from '../../../models/Order';
import Product from '../../../models/Product';
import Seller from '../../../models/Seller';

export class SellerPackagingAnalyticsService {
  /**
   * Tracks a seller's overall packaging sustainability.
   * Assumes mapping orders to seller via product line items.
   */
  static async getAnalytics(userId: string) {
    const seller = await Seller.findOne({ user: userId });
    if (!seller) return null;

    // In a fully normalized schema, we'd lookup Orders -> OrderProducts -> Product -> Seller
    // We'll mock the aggregation here to represent the required logic flow
    
    // 1. Get all products by this seller
    const sellerProducts = await Product.find({ seller: seller._id }).select('_id');
    const productIds = sellerProducts.map(p => p._id);

    // 2. Find orders containing those products
    const orders = await Order.aggregate([
      { $match: { 'products.product': { $in: productIds } } },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          standardPackaging: { $sum: { $cond: [{ $eq: ['$packagingOptionSelected', 'standard'] }, 1, 0] } },
          ecoPackaging: { $sum: { $cond: [{ $eq: ['$packagingOptionSelected', 'eco'] }, 1, 0] } },
          minimalPackaging: { $sum: { $cond: [{ $eq: ['$packagingOptionSelected', 'minimal'] }, 1, 0] } },
        }
      }
    ]);

    const stats = orders[0] || { totalOrders: 0, standardPackaging: 0, ecoPackaging: 0, minimalPackaging: 0 };
    const greenPackagingTotal = stats.ecoPackaging + stats.minimalPackaging;
    const greenPercent = stats.totalOrders > 0 ? (greenPackagingTotal / stats.totalOrders) * 100 : 0;

    return {
      packagingWasteReductionRate: Number(greenPercent.toFixed(1)), // Proxy for reduction
      ecoPackagingAdoptionPercentage: Number(greenPercent.toFixed(1)),
      totalSustainablePackagesShipped: greenPackagingTotal,
      packagingSustainabilityScore: Math.round(greenPercent), // 0-100 score based on adoption
    };
  }
}
