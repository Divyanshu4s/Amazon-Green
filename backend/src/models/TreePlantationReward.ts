import mongoose, { Schema, Document, Types } from 'mongoose';

export enum PlantationStatus {
  REQUESTED = 'requested',
  PLANTED = 'planted',
  VERIFIED = 'verified',
}

export interface ITreePlantationReward extends Document {
  user: Types.ObjectId;
  coinsRedeemed: number;
  saplingsGenerated: number;
  status: PlantationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const TreePlantationRewardSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    coinsRedeemed: { type: Number, required: true, min: 1 },
    saplingsGenerated: { type: Number, required: true, min: 1 },
    status: { type: String, enum: Object.values(PlantationStatus), default: PlantationStatus.REQUESTED },
  },
  { timestamps: true }
);

// Indexes
TreePlantationRewardSchema.index({ user: 1 });
TreePlantationRewardSchema.index({ status: 1 });

export default mongoose.model<ITreePlantationReward>('TreePlantationReward', TreePlantationRewardSchema);
