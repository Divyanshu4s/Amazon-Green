import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IImpactHistory extends Document {
  user: Types.ObjectId;
  date: Date;
  carbonSaved: number;
  plasticSaved: number;
  treesEquivalent: number;
  ecoScoreContribution: number;
  createdAt: Date;
  updatedAt: Date;
}

const ImpactHistorySchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    carbonSaved: { type: Number, default: 0, min: 0 },
    plasticSaved: { type: Number, default: 0, min: 0 },
    treesEquivalent: { type: Number, default: 0, min: 0 },
    ecoScoreContribution: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

// Compound Index for aggregating impact over a specific time period for a user
ImpactHistorySchema.index({ user: 1, date: -1 });

export default mongoose.model<IImpactHistory>('ImpactHistory', ImpactHistorySchema);
