import User from '../../../models/User';

export class LeaderboardService {
  /**
   * Generates leaderboards based on type (carbon or trees).
   * Note: A real app might use Redis for caching these heavy queries.
   */
  static async getLeaderboard(type: 'carbon' | 'trees' = 'carbon', limit: number = 10) {
    let sortObj: any = {};
    if (type === 'carbon') sortObj = { carbonSaved: -1 };
    if (type === 'trees') sortObj = { treesPlanted: -1 };

    const topUsers = await User.find({ role: 'customer' })
      .select('name profileImage carbonSaved treesPlanted ecoLevel badges')
      .sort(sortObj)
      .limit(limit);

    return topUsers;
  }
}
