import mongoose, { Schema, Document, Types } from 'mongoose';

export enum AuditStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export interface IEcoScoreAudit extends Document {
  product: Types.ObjectId;
  ruleScore: number;
  mlScore: number;
  finalScore: number;
  confidence: number;
  auditStatus: AuditStatus;
  explanation: string;
  auditDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const EcoScoreAuditSchema: Schema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    ruleScore: { type: Number, required: true, min: 0, max: 100 },
    mlScore: { type: Number, required: true, min: 0, max: 100 },
    finalScore: { type: Number, required: true, min: 0, max: 100 },
    confidence: { type: Number, required: true, min: 0, max: 1 }, // 0.0 to 1.0 confidence interval
    auditStatus: { type: String, enum: Object.values(AuditStatus), default: AuditStatus.PENDING },
    explanation: { type: String },
    auditDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Indexes
EcoScoreAuditSchema.index({ product: 1 });
EcoScoreAuditSchema.index({ auditDate: -1 });

export default mongoose.model<IEcoScoreAudit>('EcoScoreAudit', EcoScoreAuditSchema);
