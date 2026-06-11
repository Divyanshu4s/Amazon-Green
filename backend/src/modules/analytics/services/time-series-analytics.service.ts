import mongoose from 'mongoose';
import ImpactHistory from '../../../models/ImpactHistory';

export class TimeSeriesAnalyticsService {
  /**
   * Aggregates historical impact data for charts based on the specified timeframe.
   * `timeframe` can be 'daily', 'weekly', 'monthly'
   */
  static async getImpactTimeline(userId: string, timeframe: 'daily' | 'weekly' | 'monthly' = 'monthly') {
    let formatString = '%Y-%m-%d'; // Default to daily

    if (timeframe === 'monthly') formatString = '%Y-%m';
    if (timeframe === 'weekly') formatString = '%Y-W%V'; // Year and week number

    const timeline = await ImpactHistory.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $dateToString: { format: formatString, date: '$date' } },
          carbonSaved: { $sum: '$carbonSaved' },
          plasticSaved: { $sum: '$plasticSaved' },
          treesEquivalent: { $sum: '$treesEquivalent' },
        }
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          date: '$_id',
          carbonSaved: 1,
          plasticSaved: 1,
          treesEquivalent: 1,
        }
      }
    ]);

    return timeline;
  }
}
