import User from '../../../models/User';
import Order from '../../../models/Order';
import EcoScoreAudit from '../../../models/EcoScoreAudit';

export class PlatformAnalyticsService {
  /**
   * Massive aggregation for Admin level views.
   * Caching is highly recommended for this endpoint in production.
   */
  static async getPlatformSummary() {
    const [userImpact, orderImpact, auditCount] = await Promise.all([
      User.aggregate([
        {
          $group: {
            _id: null,
            totalCarbonSaved: { $sum: '$carbonSaved' },
            totalPlasticSaved: { $sum: '$plasticSaved' },
            totalTreesPlanted: { $sum: '$treesPlanted' },
          }
        }
      ]),
      Order.aggregate([
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            greenDeliveries: { $sum: { $cond: ['$sustainableDeliverySelected', 1, 0] } },
          }
        }
      ]),
      EcoScoreAudit.countDocuments()
    ]);

    const ui = userImpact[0] || { totalCarbonSaved: 0, totalPlasticSaved: 0, totalTreesPlanted: 0 };
    const oi = orderImpact[0] || { totalOrders: 0, greenDeliveries: 0 };

    return {
      macroImpact: {
        totalCarbonSavedKg: ui.totalCarbonSaved,
        totalPlasticReducedKg: ui.totalPlasticSaved,
        totalTreesPlanted: ui.totalTreesPlanted,
      },
      orders: {
        totalOrdersProcessed: oi.totalOrders,
        greenDeliveriesChosen: oi.greenDeliveries,
      },
      audits: {
        totalAuditsConducted: auditCount
      }
    };
  }
}
