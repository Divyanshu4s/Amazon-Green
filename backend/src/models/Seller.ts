import mongoose, { Schema, Document, Types } from 'mongoose';

export enum VerificationStatus {
  UNVERIFIED = 'unverified',
  VERIFIED_GREEN = 'verified_green',
  SILVER_GREEN = 'silver_green',
  GOLD_GREEN = 'gold_green',
  CLIMATE_CHAMPION = 'climate_champion',
}

export enum EcoBadge {
  NONE = 'none',
  VERIFIED_GREEN_SELLER = 'verified_green_seller',
  LOCAL_SUSTAINABILITY_LEADER = 'local_sustainability_leader',
  PACKAGING_CHAMPION = 'packaging_champion',
  CLIMATE_CHAMPION = 'climate_champion',
  ECO_INNOVATION_AWARD = 'eco_innovation_award',
}

export interface ISeller extends Document {
  user: Types.ObjectId;
  businessName: string;
  owner: string;
  sustainabilityScore: number;
  verificationStatus: VerificationStatus;
  sustainabilityCertifications: string[];
  carbonNeutralShipping: boolean;
  ecoBadge: EcoBadge;
  auditHistory: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const SellerSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    businessName: { type: String, required: true, unique: true, trim: true },
    owner: { type: String, required: true, trim: true },
    sustainabilityScore: { type: Number, default: 0, min: 0, max: 100 },
    verificationStatus: { 
      type: String, 
      enum: Object.values(VerificationStatus), 
      default: VerificationStatus.UNVERIFIED 
    },
    sustainabilityCertifications: [{ type: String }],
    carbonNeutralShipping: { type: Boolean, default: false },
    ecoBadge: { type: String, enum: Object.values(EcoBadge), default: EcoBadge.NONE },
    auditHistory: [{ type: Schema.Types.ObjectId, ref: 'EcoScoreAudit' }],
  },
  { timestamps: true }
);

// Indexes
SellerSchema.index({ businessName: 1 }, { unique: true });
SellerSchema.index({ user: 1 }, { unique: true });
SellerSchema.index({ sustainabilityScore: -1 });

export default mongoose.model<ISeller>('Seller', SellerSchema);
