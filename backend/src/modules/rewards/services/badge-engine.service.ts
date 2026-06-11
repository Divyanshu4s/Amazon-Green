import User, { IUser } from '../../../models/User';

export class BadgeEngine {
  /**
   * Evaluates user stats and assigns badges automatically if they aren't already earned.
   * Returns newly earned badges.
   */
  static async evaluateAndAssignBadges(userId: string): Promise<string[]> {
    const user = await User.findById(userId);
    if (!user) return [];

    const currentBadges = new Set(user.badges || []);
    const newlyEarned: string[] = [];

    const award = (badgeName: string) => {
      if (!currentBadges.has(badgeName)) {
        user.badges.push(badgeName);
        newlyEarned.push(badgeName);
      }
    };

    // Rule: First Green Purchase
    // Mocking purchase count check via greenCredits existence for simplicity
    if (user.greenCredits > 0) {
      award('First Green Purchase');
    }

    // Rule: Carbon Saver
    if (user.carbonSaved >= 50) {
      award('Carbon Saver');
    }
    
    if (user.carbonSaved >= 500) {
      award('Carbon Champion');
    }

    // Rule: Plastic Free Hero
    if (user.plasticSaved >= 10) {
      award('Plastic Free Hero');
    }

    // Rule: Verified Green Advocate
    // Assumes saplingCoins > 100 as a proxy for engagement
    if (user.saplingCoins >= 100) {
      award('Verified Green Advocate');
    }

    if (newlyEarned.length > 0) {
      await user.save();
    }

    return newlyEarned;
  }
}
