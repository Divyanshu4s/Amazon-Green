import mongoose, { Schema, Document, Types } from 'mongoose';

export enum RecommendationType {
  ALTERNATIVE = 'alternative',
  PERSONALIZED = 'personalized',
  LOCAL = 'local',
  BUNDLE = 'bundle',
  TRENDING = 'trending',
}

export interface IRecommendationLog extends Document {
  user: Types.ObjectId;
  product: Types.ObjectId;
  type: RecommendationType;
  baseProductId?: Types.ObjectId; // If it was an alternative
  
  // Model Data
  ecoScoreAtRecommendation: number;
  confidenceScore: number;
  
  // Interactions
  viewed: boolean;
  clicked: boolean;
  purchased: boolean;
  
  // Derived Impact
  carbonSavedIfPurchasedKg?: number;
  
  createdAt: Date;
  updatedAt: Date;
}

const RecommendationLogSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    type: { type: String, enum: Object.values(RecommendationType), required: true },
    baseProductId: { type: Schema.Types.ObjectId, ref: 'Product' },
    
    ecoScoreAtRecommendation: { type: Number, required: true },
    confidenceScore: { type: Number, required: true },
    
    viewed: { type: Boolean, default: false },
    clicked: { type: Boolean, default: false },
    purchased: { type: Boolean, default: false },
    
    carbonSavedIfPurchasedKg: { type: Number },
  },
  { timestamps: true }
);

RecommendationLogSchema.index({ user: 1, type: 1 });
RecommendationLogSchema.index({ product: 1 });

export default mongoose.model<IRecommendationLog>('RecommendationLog', RecommendationLogSchema);
