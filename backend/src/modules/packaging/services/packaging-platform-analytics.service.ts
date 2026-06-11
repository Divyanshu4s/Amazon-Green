import Order from '../../../models/Order';
import User from '../../../models/User';

export class PackagingPlatformAnalyticsService {
  /**
   * Massive aggregation for Admin level views on Packaging Impact.
   */
  static async getPlatformSummary() {
    const [orderStats, userImpact] = await Promise.all([
      Order.aggregate([
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            standard: { $sum: { $cond: [{ $eq: ['$packagingOptionSelected', 'standard'] }, 1, 0] } },
            eco: { $sum: { $cond: [{ $eq: ['$packagingOptionSelected', 'eco'] }, 1, 0] } },
            minimal: { $sum: { $cond: [{ $eq: ['$packagingOptionSelected', 'minimal'] }, 1, 0] } },
          }
        }
      ]),
      User.aggregate([
        {
          $group: {
            _id: null,
            totalPlasticReduced: { $sum: '$plasticSaved' }, // Derived partially from packaging
          }
        }
      ])
    ]);

    const os = orderStats[0] || { totalOrders: 0, standard: 0, eco: 0, minimal: 0 };
    const ui = userImpact[0] || { totalPlasticReduced: 0 };

    return {
      totalOrdersProcessed: os.totalOrders,
      packagingAdoption: {
        standard: os.standard,
        eco: os.eco,
        minimal: os.minimal,
      },
      // In a real app, 'packagingWasteSaved' would be tracked explicitly per order.
      // We are using plastic reduction as a proxy here based on DB models.
      platformImpact: {
        totalPlasticReducedKg: ui.totalPlasticReduced,
        totalSustainablePackagesShipped: os.eco + os.minimal,
      }
    };
  }
}
