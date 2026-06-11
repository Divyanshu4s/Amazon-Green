import mongoose, { Schema, Document, Types } from 'mongoose';

export enum CertificationType {
  ISO_14001 = 'iso_14001',
  FSC = 'fsc',
  ENERGY_STAR = 'energy_star',
  FAIR_TRADE = 'fair_trade',
  CARBON_NEUTRAL = 'carbon_neutral',
  CUSTOM = 'custom',
}

export interface ISellerDocument extends Document {
  seller: Types.ObjectId;
  certificationName: CertificationType;
  customName?: string;
  certificateFileUrl: string; // URL to S3 or similar
  issueDate: Date;
  expiryDate: Date;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SellerDocumentSchema: Schema = new Schema(
  {
    seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
    certificationName: { type: String, enum: Object.values(CertificationType), required: true },
    customName: { type: String },
    certificateFileUrl: { type: String, required: true },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    adminNotes: { type: String },
  },
  { timestamps: true }
);

SellerDocumentSchema.index({ seller: 1 });

export default mongoose.model<ISellerDocument>('SellerDocument', SellerDocumentSchema);
