import User from '../../../models/User';

export class EcoLevelService {
  private static LEVELS = [
    { level: 1, title: 'Seedling', minCarbon: 0, minCoins: 0 },
    { level: 2, title: 'Green Explorer', minCarbon: 50, minCoins: 200 },
    { level: 3, title: 'Eco Warrior', minCarbon: 150, minCoins: 500 },
    { level: 4, title: 'Earth Guardian', minCarbon: 500, minCoins: 1500 },
    { level: 5, title: 'Climate Champion', minCarbon: 1000, minCoins: 5000 },
  ];

  /**
   * Recalculates user's eco level based on their absolute stats.
   */
  static async evaluateLevel(userId: string) {
    const user = await User.findById(userId);
    if (!user) return null;

    let newLevel = 1;
    for (let i = this.LEVELS.length - 1; i >= 0; i--) {
      const criteria = this.LEVELS[i];
      if (user.carbonSaved >= criteria.minCarbon && user.saplingCoins >= criteria.minCoins) {
        newLevel = criteria.level;
        break;
      }
    }

    let leveledUp = false;
    if (newLevel > user.ecoLevel) {
      user.ecoLevel = newLevel;
      await user.save();
      leveledUp = true;
    }

    return {
      currentLevel: user.ecoLevel,
      title: this.LEVELS.find(l => l.level === user.ecoLevel)?.title || 'Seedling',
      leveledUp
    };
  }
}
