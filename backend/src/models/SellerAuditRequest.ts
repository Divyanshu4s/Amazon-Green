import mongoose, { Schema, Document, Types } from 'mongoose';

export enum AuditStatus {
  SUBMITTED = 'submitted',
  PROCESSING = 'processing',
  ML_REVIEW = 'ml_review',
  ADMIN_REVIEW = 'admin_review',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

export interface ISellerAuditRequest extends Document {
  seller: Types.ObjectId;
  status: AuditStatus;
  
  // Input Data
  claims: string[];
  manufacturingInfo: string;
  materialInfo: string;
  
  // Output ML & Engine Data
  ruleBasedScore?: number;
  mlConfidenceScore?: number;
  mlRiskLevel?: 'Low' | 'Medium' | 'High' | 'Critical';
  
  // Final Merged Output
  finalAuditScore?: number;
  recommendedBadge?: string;
  
  adminFeedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SellerAuditRequestSchema: Schema = new Schema(
  {
    seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
    status: { type: String, enum: Object.values(AuditStatus), default: AuditStatus.SUBMITTED },
    claims: [{ type: String }],
    manufacturingInfo: { type: String },
    materialInfo: { type: String },
    
    ruleBasedScore: { type: Number },
    mlConfidenceScore: { type: Number },
    mlRiskLevel: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'] },
    
    finalAuditScore: { type: Number },
    recommendedBadge: { type: String },
    
    adminFeedback: { type: String },
  },
  { timestamps: true }
);

SellerAuditRequestSchema.index({ seller: 1, status: 1 });

export default mongoose.model<ISellerAuditRequest>('SellerAuditRequest', SellerAuditRequestSchema);
