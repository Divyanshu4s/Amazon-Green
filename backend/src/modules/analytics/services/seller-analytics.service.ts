import mongoose from 'mongoose';
import Seller from '../../../models/Seller';
import Product from '../../../models/Product';
import Order from '../../../models/Order';

export class SellerAnalyticsService {
  /**
   * Aggregates the seller's specific platform impact.
   */
  static async getSellerDashboard(userId: string) {
    const seller = await Seller.findOne({ user: userId });
    if (!seller) return null;

    const products = await Product.aggregate([
      { $match: { seller: seller._id, isDeleted: false } },
      {
        $group: {
          _id: null,
          totalListed: { $sum: 1 },
          avgEcoScore: { $avg: '$ecoScore' },
          greenProducts: { $sum: { $cond: [{ $gte: ['$ecoScore', 80] }, 1, 0] } }
        }
      }
    ]);

    const prodStats = products[0] || { totalListed: 0, avgEcoScore: 0, greenProducts: 0 };
    const greenPercent = prodStats.totalListed > 0 ? (prodStats.greenProducts / prodStats.totalListed) * 100 : 0;

    // Approximating seller impact based on orders containing their products
    // (In a real app, you would split the Carbon Saved in the Order schema by product line item)
    // Here we'll do a basic lookup of orders that have this seller's products
    
    return {
      businessName: seller.businessName,
      ecoBadge: seller.ecoBadge,
      verificationStatus: seller.verificationStatus,
      sustainabilityScore: seller.sustainabilityScore,
      productsListed: prodStats.totalListed,
      averageEcoScore: Math.round(prodStats.avgEcoScore),
      greenProductPercentage: Number(greenPercent.toFixed(1)),
      // impactGenerated: Not explicitly mapped in schema right now, would require line-item level carbon tracking
    };
  }
}
