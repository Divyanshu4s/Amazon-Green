import SustainabilityGoal, { GoalType, GoalStatus } from '../../../models/SustainabilityGoal';
import User from '../../../models/User';

export class GoalTrackingService {
  /**
   * Gets a user's active goals and dynamically calculates their real-time progress percentage.
   */
  static async getUserGoals(userId: string) {
    // Sync current values before returning
    await this.syncGoalsWithUserStats(userId);

    const goals = await SustainabilityGoal.find({ user: userId }).sort({ createdAt: -1 });
    
    return goals.map(g => ({
      id: g._id,
      type: g.type,
      targetValue: g.targetValue,
      currentValue: g.currentValue,
      status: g.status,
      percentageComplete: Math.min(100, Math.round((g.currentValue / g.targetValue) * 100)),
      deadline: g.deadline,
    }));
  }

  /**
   * Creates a new personal goal.
   */
  static async createGoal(userId: string, type: GoalType, targetValue: number, deadline?: Date) {
    return SustainabilityGoal.create({
      user: userId,
      type,
      targetValue,
      deadline,
    });
  }

  /**
   * Syncs the 'currentValue' of goals with the User's lifetime stats.
   * Note: In a real app, if a goal is set *today*, you would only count progress from *today* 
   * using ImpactHistory. For simplicity, we're mapping to lifetime metrics here.
   */
  private static async syncGoalsWithUserStats(userId: string) {
    const user = await User.findById(userId);
    if (!user) return;

    const activeGoals = await SustainabilityGoal.find({ user: userId, status: GoalStatus.ACTIVE });
    
    for (const goal of activeGoals) {
      let updatedVal = goal.currentValue;
      
      switch(goal.type) {
        case GoalType.SAVE_CARBON: updatedVal = user.carbonSaved; break;
        case GoalType.PLANT_TREES: updatedVal = user.treesPlanted; break;
        case GoalType.EARN_COINS: updatedVal = user.saplingCoins; break;
        // buy_eco_products would require Order counting logic
      }

      goal.currentValue = updatedVal;
      if (goal.currentValue >= goal.targetValue) {
        goal.status = GoalStatus.COMPLETED;
      }
      await goal.save();
    }
  }
}
