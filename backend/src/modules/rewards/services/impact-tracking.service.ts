import User from '../../../models/User';
import ImpactHistory from '../../../models/ImpactHistory';

export class ImpactTrackingService {
  /**
   * Tracks incremental impact from an order and logs it to history.
   */
  static async logImpact(userId: string, impact: {
    carbonSavedDelta: number;
    plasticSavedDelta: number;
    ecoScoreContribution: number;
  }) {
    const user = await User.findById(userId);
    if (!user) return;

    // Update absolute lifetime metrics
    user.carbonSaved += impact.carbonSavedDelta;
    user.plasticSaved += impact.plasticSavedDelta;
    await user.save();

    // Log the historical entry
    await ImpactHistory.create({
      user: userId,
      date: new Date(),
      carbonSaved: impact.carbonSavedDelta,
      plasticSaved: impact.plasticSavedDelta,
      ecoScoreContribution: impact.ecoScoreContribution,
    });
  }
}
