import mongoose, { Schema, Document, Types } from 'mongoose';

export enum TransactionSource {
  ECO_PURCHASE = 'eco_purchase',
  LOCAL_PURCHASE = 'local_purchase',
  GROUP_DELIVERY = 'group_delivery',
  MINIMAL_PACKAGING = 'minimal_packaging',
  SELLER_REWARDS = 'seller_rewards',
  REDEMPTION = 'redemption',
}

export interface IGreenCreditTransaction extends Document {
  user: Types.ObjectId;
  source: TransactionSource;
  creditsEarned: number;
  creditsSpent: number;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const GreenCreditTransactionSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    source: { type: String, enum: Object.values(TransactionSource), required: true },
    creditsEarned: { type: Number, default: 0, min: 0 },
    creditsSpent: { type: Number, default: 0, min: 0 },
    transactionDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Indexes
GreenCreditTransactionSchema.index({ user: 1 });
GreenCreditTransactionSchema.index({ transactionDate: -1 });

export default mongoose.model<IGreenCreditTransaction>('GreenCreditTransaction', GreenCreditTransactionSchema);
