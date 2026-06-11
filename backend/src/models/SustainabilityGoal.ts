import mongoose, { Schema, Document, Types } from 'mongoose';

export enum GoalType {
  SAVE_CARBON = 'save_carbon',
  PLANT_TREES = 'plant_trees',
  EARN_COINS = 'earn_coins',
  BUY_ECO_PRODUCTS = 'buy_eco_products',
}

export enum GoalStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  ABANDONED = 'abandoned',
}

export interface ISustainabilityGoal extends Document {
  user: Types.ObjectId;
  type: GoalType;
  targetValue: number;
  currentValue: number;
  status: GoalStatus;
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SustainabilityGoalSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: Object.values(GoalType), required: true },
    targetValue: { type: Number, required: true, min: 1 },
    currentValue: { type: Number, default: 0, min: 0 },
    status: { type: String, enum: Object.values(GoalStatus), default: GoalStatus.ACTIVE },
    deadline: { type: Date },
  },
  { timestamps: true }
);

// Indexes for fast lookup
SustainabilityGoalSchema.index({ user: 1, status: 1 });

export default mongoose.model<ISustainabilityGoal>('SustainabilityGoal', SustainabilityGoalSchema);
