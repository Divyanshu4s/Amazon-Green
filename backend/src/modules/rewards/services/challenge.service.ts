import fs from 'fs';
import path from 'path';
import User from '../../../models/User';

export class ChallengeService {
  private static challenges: any[] | null = null;

  private static loadChallenges() {
    if (!this.challenges) {
      const p = path.resolve(__dirname, '../config/challenges.json');
      const data = fs.readFileSync(p, 'utf-8');
      this.challenges = JSON.parse(data);
    }
    return this.challenges!;
  }

  /**
   * Evaluates a user's progress against the static JSON challenges.
   * In a real app, 'ecoPurchases' or 'minimalPackagingChosen' would be tracked 
   * in a dedicated metrics collection, but we approximate using User fields here.
   */
  static async getUserChallenges(userId: string) {
    const user = await User.findById(userId);
    if (!user) return [];

    const challenges = this.loadChallenges();
    const progressData = challenges.map(challenge => {
      let currentProgress = 0;

      // Mock Metric Lookups
      switch(challenge.metric) {
        case 'carbonSaved':
          currentProgress = user.carbonSaved;
          break;
        case 'ecoPurchases':
          currentProgress = user.saplingCoins > 100 ? 5 : 2; // Mocking purchase count based on coins
          break;
        default:
          currentProgress = 0;
      }

      const percent = Math.min(100, Math.round((currentProgress / challenge.target) * 100));
      const completed = currentProgress >= challenge.target;

      return {
        ...challenge,
        currentProgress,
        percent,
        completed
      };
    });

    return progressData;
  }
}
