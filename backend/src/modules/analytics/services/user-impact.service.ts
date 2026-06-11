import mongoose from 'mongoose';
import User from '../../../models/User';
import Order from '../../../models/Order';
import GreenCreditTransaction from '../../../models/GreenCreditTransaction';

export class UserImpactService {
  /**
   * Fetches high-level lifetime stats for the user's dashboard.
   */
  static async getLifetimeImpact(userId: string) {
    const user = await User.findById(userId).select('carbonSaved plasticSaved treesPlanted greenCredits saplingCoins');
    
    // Aggregate order data for EcoScore and Deliveries
    const orderStats = await Order.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $unwind: '$products' },
      { 
        $group: {
          _id: null,
          avgEcoScore: { $avg: '$products.ecoScoreAtPurchase' },
          sustainablePurchases: { 
            $sum: { $cond: [{ $gte: ['$products.ecoScoreAtPurchase', 80] }, 1, 0] } 
          },
          greenDeliveries: { $sum: { $cond: ['$sustainableDeliverySelected', 1, 0] } },
          groupDeliveries: { $sum: { $cond: ['$groupDeliverySelected', 1, 0] } },
          minimalPackaging: { $sum: { $cond: [{ $eq: ['$packagingOptionSelected', 'minimal'] }, 1, 0] } },
        }
      }
    ]);

    const stats = orderStats[0] || {
      avgEcoScore: 0, sustainablePurchases: 0, greenDeliveries: 0, groupDeliveries: 0, minimalPackaging: 0
    };

    return {
      totalCarbonSavedKg: user?.carbonSaved || 0,
      plasticWasteReducedKg: user?.plasticSaved || 0,
      packagingWasteSavedCount: stats.minimalPackaging,
      treesEquivalent: user?.treesPlanted || 0,
      sustainablePurchases: stats.sustainablePurchases,
      greenDeliveriesChosen: stats.greenDeliveries,
      groupDeliveriesJoined: stats.groupDeliveries,
      greenCreditsEarned: user?.greenCredits || 0,
      saplingCoins: user?.saplingCoins || 0,
      ecoScoreAverage: Math.round(stats.avgEcoScore || 0),
    };
  }
}
