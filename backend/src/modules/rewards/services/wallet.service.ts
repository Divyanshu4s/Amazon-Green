import User from '../../../models/User';
import GreenCreditTransaction, { TransactionSource } from '../../../models/GreenCreditTransaction';

export class WalletService {
  /**
   * Retrieves the wallet balance and transaction history.
   */
  static async getWalletData(userId: string) {
    const user = await User.findById(userId).select('saplingCoins greenCredits carbonSaved treesPlanted');
    const history = await GreenCreditTransaction.find({ user: userId }).sort({ transactionDate: -1 }).limit(20);

    return {
      balances: {
        saplingCoins: user?.saplingCoins || 0,
        greenCredits: user?.greenCredits || 0,
        carbonSaved: user?.carbonSaved || 0,
        treesPlanted: user?.treesPlanted || 0,
      },
      recentTransactions: history
    };
  }
}

export class TransactionService {
  /**
   * Logs a credit/coin earning event.
   */
  static async logEarning(userId: string, source: TransactionSource, creditsEarned: number) {
    return GreenCreditTransaction.create({
      user: userId,
      source,
      creditsEarned,
      creditsSpent: 0
    });
  }
}
